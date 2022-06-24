// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { logger } = require('./next-pino/server');
const { createRedisInstance } = require('./redis/redisdb');
const { pubSubRedis } = require('./redis/redis-pubsub');

require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

const { setGlobals } = require('./helpers/env_setter');
setGlobals();

createRedisInstance(function (client) {
  pubSubRedis(client, 'voyagerData');
});

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/_next/*', (req, res) => {
      /* serving _next static content using next.js handler */
      handle(req, res);
    });

    server.get('/healthcheck', (req, res) => {
      logger.info('Test logger 2');
      return res.status(200).json({ 'Health check Status': 'ok' });
    });

    server.get('*', (req, res) => {
      /* serving page */
      logger.info('Test logger 1');
      return renderAndCache(req, res);
    });

    logger.info('Inside server.js');

    server.use(function (error, req, res, next) {
      handle(error, req, res).catch((e) => {
        // use rejected promise to forward error to next express middleware
        // logger.error(__filename, e);
        next(e);
      });
    });

    server.use(errorHandler);

    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    logger.error(__filename, e);
  });

function errorHandler(err, req, res, next) {
  // logger.error(__filename, err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

async function renderAndCache(req, res) {
  try {
   // let's render the page into HTML
    const html = await app.renderToHTML(req, res, req.path, req.query);
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query);
  }
}
