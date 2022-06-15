//import redis from 'redis';
const redis = require('redis');
//import logger from '../logger';


const createRedisInstance =  (onSuccessCallback, res) => {
	
	// config from package.json
	try {
		const obj = { 'detect_buffers' : true};
		const {HOST, PORT, DB} = global.__REDISCONFIG__;
		obj.host = HOST;
		obj.port = PORT;
		obj.db = DB;

		const client = redis.createClient(obj);
		client.on('connect', function() {
			global.__REDISCONFIG__.REDISINSTANCE = client;
			// if (res) {
			// 	res.send('Connected to redis, retry purging!');
			// }
			console.log('Successfully connected to Redis');
			//logger.info('Successfully connected to Redis');
			onSuccessCallback(client);
		});
		client.on('error', function(err) {
			// if (res) {
			// 	res.send(`Redis failed to connect!, ${err}`);
			// }
			// console.log('redis failed to connect');
			//logger.info('unable to connect to redis! ', err);
			console.log('unable to connect to redis!', err);
			global.__REDISCONFIG__.REDISINSTANCE = null;
		});
	} catch(err) {
		console.log(err);
		//logger.info('unable to connect to redis! ', err);
		console.log('unable to connect to redis! ', err);
		// res.send(`Redis failed to connect! Error: ${err}`);
	}
};

module.exports = {
  createRedisInstance
};