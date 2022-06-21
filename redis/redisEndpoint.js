// // purge URL : https://www.goibibo.com/trains/purge/?page=['faq','meta','footer']
// //import { publishToChannel } from './redis-pubsub';
// const { publishToChannel} = require('./redis-pubsub');

// const purgeTrains = (req, res) => {
// 	const { search = '' } = req._parsedUrl;

// 	var searchParams = new URLSearchParams(search);
// 	const urlListToPurge = searchParams.get('page');

// 	if (urlListToPurge && urlListToPurge.length > 0) {
// 		if (!(global.__REDISCONFIG__.REDISINSTANCE)) {
// 			res.send('Missing Redis Connection, trying to establish a new Connection');
// 		} else {
// 			res.send(`Purging ${urlListToPurge.toString()} endpoints!`);
// 			publishToChannel('voyagerData', urlListToPurge);
// 		}
// 	} else {
// 		res.send(`Missing purge endpoints`);
// 	}
// 	if (urlListToPurge && Array.isArray(urlListToPurge)) {
// 		console.log('====', urlListToPurge.join(','));
// 	}
// };

// module.exports = {
//   purgeTrains
// };
