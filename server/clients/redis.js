const redis = require('redis');
const conf = require('../conf/redis');
const client = redis.createClient(conf);

client
    .on('error', err => console.log('------ Redis connection failed ------' + err))
    .on('connect', () => console.log('------ Redis connection succeed ------'))

// client.set('haha2', '2', function(err,replies){
// 	console.log(err,replies);
// 	client.quit();
// })
// client.hset('hash key', 'hashtest 1', 'some value', redis.print)
// client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

// client.hkeys('hash key', function (err, replies) {
//   console.log(replies.length + ' replies:')

//   replies.forEach(function (reply, i) {
//     console.log('    ' + i + ': ' + reply)
//   })

//   client.quit()
// })

module.exports = client