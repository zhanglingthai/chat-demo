module.exports = {
    expire: process.env.REDIS_EXPIRE || 1800, //实效
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    prefix: process.env.REDIS_PREFIX || 'chat:' //前缀
};