const secret = require('./secret');

module.exports = {
    host: 'localhost',
    user: 'root',
    password: secret,
    database: 'chat', // 前面建的user表位于些数据库中
    port: 3306,
    connectionLimit:20//连接数
};