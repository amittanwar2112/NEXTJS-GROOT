// this is the logger for the browser
import pino from 'pino';

const isServer = typeof window === 'undefined';

const config = {
  serverUrl: process.env.REACT_APP_API_PATH,
  env: process.env.NODE_ENV,
  publicUrl: process.env.PUBLIC_URL
};

const pinoConfig = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      messageFormat: '{filename}: {msg}',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',    // it will translate the time in readable formate
      ignore: 'pid,hostname'  // this will ignore the hotsname of machine in logging
    }
  },
  browser: {
    asObject: true
  }
};

if (config.serverUrl) {
  pinoConfig.browser.transmit = {
    level: 'info',
    send: (level, logEvent) => {
      const msg = logEvent.messages[0];

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        type: 'application/json'
      };
      let blob = new Blob([JSON.stringify({ msg, level })], headers);
      navigator.sendBeacon(`${config.serverUrl}/api/log`, blob);
    }
  };
}

let logger = pino(pinoConfig);

if (isServer) {
  // logger = pino(pino.destination(LOG_FILE_PATH));
  process.on('uncaughtException', (err) => {
    console.error('uncaughtException', { err });
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', { err });
    process.exit(1);
  });
}

export const log = (msg) => logger.info(msg);
export default logger;
