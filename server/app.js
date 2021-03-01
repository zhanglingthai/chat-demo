const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const ejs = require('ejs');
const cors = require("cors");

//import router
const routers = require('./routes');
const user = require('./routes/user');

const expressJWT = require('express-jwt')
const util = require('./common/util');
const secret = require('./conf').secret;

const app = express();

console.log(app.get('env')) //mode

//代理信任的配置
// app.set('trust proxy', function(ip) {
//     if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
//     else return false;
// });


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

// 处理跨域
app.use(cors())

//第三方中间件
app.use(logger('dev'));
//内置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//第三方中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 校验token
app.use(expressJWT({
    secret,
    algorithms: ['HS256'],
    getToken: req => {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers.token;
        if (token) {
            req.token = token;
            return token;
        }
        return null
    }
}).unless({
    path: ['/login', '/reg', '/checkUser', '/test'] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
}));

//route setup
app.use('/', routers);
app.use('/user', user);

//catch token wrong
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        next(createError(401, 'token无效'));
    }else{
        next(err);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, '地址为空'));
});

// error handler


// development模式错误处理
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