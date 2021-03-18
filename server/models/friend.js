const pool = require('../clients/mysql').pool;
const createError = require('http-errors');
const util = require('../common/util');
const msg = require('./msg');

const Friend = {
    //获取好友列表
    list(req, res, next) {
        const userid = util.tokenDecrypt(req.token).userid;

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT list,black_list,block_list FROM friends WHERE userid = ?', [userid], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (results.length) {

                            Promise.all([Friend.info(results[0].list), Friend.info(results[0].black_list), Friend.info(results[0].block_list), msg.getSYSMsg()]).then(values => {
                                    let friendList = {
                                        list: values[0],
                                        black_list: values[1],
                                        block_list: values[2]
                                    }
                                    let sysMsgList = values[3];

                                    res.json({ success: true, data: { friendList, sysMsgList } });

                                })
                                .catch(err => {
                                    next(createError(500, err));
                                })


                        } else {
                            next(createError(500, '好友列表未找到'));
                        }
                    }
                    conn.release();
                })
            }
        });
    },
    //批量或单个查询用户详情
    info(listArr) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err)
                } else {
                    conn.query(`SELECT * FROM userinfo WHERE userid IN (${listArr});`, (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                        conn.release();
                    })
                }
            });
        })
    }
}



module.exports = Friend;