const secret = require('./secret');
const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env == 'development') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: secret,
        database: 'chat', // 前面建的user表位于些数据库中
        port: 3306,
        connectionLimit: 20 //连接数
    };

} else if (env == 'production') {
    MYSQL_CONF = {
        host: '47.111.177.5',
        user: 'root',
        password: secret,
        database: 'chat', // 前面建的user表位于些数据库中
        port: 3306,
        connectionLimit: 20 //连接数
    };
}

module.exports = { MYSQL_CONF };