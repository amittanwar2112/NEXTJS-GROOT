// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { createRedisInstance } = require('./redis/redisdb');
const { pubSubRedis } = require('./redis/redis-pubsub');

require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

const { setGlobals } = require('./helpers/env_setter');
setGlobals();

//console.log(createRedisInstance);

createRedisInstance(function (client) {
  pubSubRedis(client, 'voyagerData');
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

//console.log("aaaa=>",process.env.REDIS_HOST);
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/_next/*', (req, res) => {
      /* serving _next static content using next.js handler */
      handle(req, res);
    });

    server.get('*', (req, res) => {
      /* serving page */
      // logger.info('Test logger 1');
      return renderAndCache(req, res);
    });

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
    //logger.error(__filename, e);
    console.log('Error:', e);
  });

function errorHandler(err, req, res, next) {
  // logger.error(__filename, err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

function getCacheKey(req) {
  return `${req.path}`;
}

async function renderAndCache(req, res) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    //console.log(`serving from cache ${key}`);
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    //console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, req.path, req.query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query);
  }
}
