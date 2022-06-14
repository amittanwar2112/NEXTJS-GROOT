//import {getFAQData, getFooterData, getMetaData,getHeaderData} from'../Utils/env_setter';
//import logger from '../logger';

// function publishToChannel(channelName, apiArray) {
//   const client = global.__REDISCONFIG__.REDISINSTANCE;
//   if (client === null || client === undefined) {
//     logger.info('Redis Client Not Found');
//     return;
//   }
//   const pub = client.duplicate();
//   pub.publish(channelName, apiArray);
//   pub.quit();
// }

function pubSubRedis(client, channelName) {
  if (!client) {
    return;
  }

  const sub = client.duplicate();
  // store as global variable
  global.__REDIS_SUBSCRIPTION__[channelName] = sub;

  // subscribe to channel - channelName
  sub.subscribe(channelName);
  sub.on("subscribe", function (channel, count) {
    //logger.info('Subscribed to : ' + channelName);
    console.log('Subscribed to : ' + channelName);
  });

  sub.on("message", function (channel, message) {
    //logger.info("Message from channel: " + `${channel}`);
    //logger.info(`Message is: ${message}`);
    if (message && message.length > 0) {
      // if (message.indexOf('faq') > -1) {
      //   getFAQData();
      // }
      // if (message.indexOf('meta') > -1) {
      //   getMetaData();
      // }
      // if (message.indexOf('footer') > -1) {
      //   getFooterData();
      // }
      // if (message.indexOf('header') > -1) {
      //   getHeaderData();
      // }
    }
  });
}

module.exports = {
  pubSubRedis,
  // publishToChannel
};