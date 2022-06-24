// this is the logger for the server
const pino = require('pino');

const logger = pino({
  level: process.env.LOGLEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      messageFormat: '{filename}: {msg}',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',    // it will translate the time in readable formate
      ignore: 'pid,hostname'  // this will ignore the hotsname of machine in logging
    }
  }
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', { err });
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', { err });
  process.exit(1);
});

module.exports = {
  logger
};
