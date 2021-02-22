var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var ejs = require('ejs');

//import router
var routers = require('./routes');
var user = require('./routes/user');

var app = express();

//代理信任的配置
// app.set('trust proxy', function(ip) {
//     if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
//     else return false;
// });


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

//第三方中间件
app.use(logger('dev'));
//内置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//第三方中间件
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//应用层中间件
// let mid1 = function(req, res, next) {
//     req.requestTime = Date.now();
//     console.log('应用层中间件')
//     next()
// }
// app.use(mid1);
// let mid2 = function(req, res, next) {
//     req.requestTime = Date.now();
//     console.log('应用层中间件2,指定路由使用')
//     next('route') //这里的参数是没用的，必须要app.METHOD里才有作用
// }
// let mid3 = function(req, res, next) {
//     req.requestTime = Date.now();
//     console.log('应用层中间件3,指定路由直接完成返回')
//     res.send('完成返回')
// }
// app.use('/test2', mid2, mid3)
// app.use('/test3', mid3)
// let mid4 = function(req, res, next) {
//     req.requestTime = Date.now();
//     console.log('应用层中间件4,指定mothed返回')

//     next('route') //这里可以直接跳过
// }
// app.post('/test4', mid4, mid3)



//跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});

//route setup
app.use('/', routers);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, '该地址为空'));
});

// error handler

// development模式错误处理
console.log(app.get('env')) //mode
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        // console.log('错误处理中间件1')
        res.locals.message = err.message;
        res.locals.error = err;

        // render the error page
        res.status(err.status || 500).json({
            success: false,
            status: err.status || 500,
            msg: err.message
        })
    });
}

// production模式错误处理
app.use(function(err, req, res, next) {
    // console.log('错误处理中间件2')
    res.locals.message = err.message;
    res.locals.error = {};

    // render the error page
    res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        msg: err.message
    });

});

module.exports = app;