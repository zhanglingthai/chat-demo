var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const redisClient = require('../clients/redis')
const mysqlClient = require('../clients/mysql')

<<<<<<< HEAD
=======
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
  	success: true,
  	data:[1,2,3]
  })
});
>>>>>>> 2a714d9115a21ae0c66499420a5f09600744e3b9

//路由中间件
// router.use(function(req, res, next) {
//     console.log('路由中间件1')
//     next()
// })

// router.use('/test5', function(req, res, next) {
//     console.log('路由中间件2，指定路由')
//     next()
// })

// router.get('/test6', function(req, res, next) {
//     console.log('路由中间件3，指定路由跳过')
//     next('router')
//     // next(createError(405, 'This video does not exist!'))//跑出错误
// })

// /* GET home page. */

router.get('/redistest', function(req, res, next) {
    let data = req.query;
    let key = data.key,
        value = data.value;

    if (key && value) {
        redisClient.set(key, value, (err, repley) => {
            if (err) {
                next(createError(500, err));
            }
            redisClient.get(key, (err, repley) => {
                if (err) {
                    next(createError(500, err));
                } else {
                    res.json({ key, value: repley })
                }

            })
        });
    } else {
        next(createError(500, '参数缺少'));
    }
})

router.post('/redistest', function(req, res, next) {
    let data = req.body;
    let key = data.key,
        value = data.value;

    if (key && value) {
        redisClient.set(key, value, (err, repley) => {
            if (err) {
                next(createError(500, err));
            }
            redisClient.get(key, (err, repley) => {
                if (err) {
                    next(createError(500, err));
                } else {
                    res.json({ key, value: repley })
                }

            })
        });
    } else {
        next(createError(500, '参数缺少'));
    }


})

// router.get('/', function(req, res, next) {
//     res.json({
//         success: true,
//         data: [1, 2, 3],
//         body: req.body,
//         query: req.query,
//         method: req.method
//     })
// });

// router.post('/', function(req, res, next) {
//     res.json({
//         success: true,
//         data: [1, 2, 3],
//         body: req.body,
//         query: req.query,
//         method: req.method
//     })
// });

// router.get('/test', function(req, res, next) {
//     res.json({})
// });

// //链式
// router.route('/test1')
//     .get(function(req, res, next) {
//         console.log(1)
//         res.send(req.method)
//     })
//     .post(function(req, res, next) {
//         console.log(2)
//         res.send(req.method)
//     })
//     .put(function(req, res, next) {
//         console.log(3)
//         res.send(req.method)
//     })

// router.get('/test.text', function(req, res, next) {
//     res.send(req.path)
// });

// //匹配 acd 和 abcd。
// router.get('/ab?cd', function(req, res, next) {
//     res.send(req.path)
// });

// //匹配 abcd、abbcd、abbbcd
// router.get('/ab+cd', function(req, res) {
//     res.send(req.path)
// });

// //匹配 abcd、abxcd、abRABDOMcd、ab123cd
// router.get('/ab*cd', function(req, res) {
//     res.send(req.path)
// });

// //匹配 /abe 和 /abcde。
// router.get('/ab(cd)?e', function(req, res) {
//     res.send(req.path)
// });

// //匹配名称中具有“a”的所有路由
// // router.get(/a/, function(req, res) {
// //   res.send('/a/');
// // });

// //结尾fly匹配
// router.get(/.*fly$/, function(req, res, next) {
//     console.log(1112);
//     next();
//     //next('route')//可跳过后续回调
// }, function(req, res) {
//     console.log(2223);
//     res.send('/.*fly$/');
// });

module.exports = router;