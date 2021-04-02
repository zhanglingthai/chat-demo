const { pool, exec } = require('../clients/mysql');
const msg = require('./msg');

const Friend = {
    //获取好友列表
    list({ userid }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    conn.query('SELECT list,black_list,block_list FROM friends WHERE userid = ?', [userid], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (results.length) {

                                Promise.all([Friend.info(results[0].list), Friend.info(results[0].black_list), Friend.info(results[0].block_list)]).then(values => {
                                        let friendList = {
                                            list: values[0],
                                            black_list: values[1],
                                            block_list: values[2]
                                        }

                                        resolve({ friendList })

                                    })
                                    .catch(err => {
                                        reject(err)
                                    })


                            } else {
                                reject('好友列表未找到');
                            }
                        }
                        conn.release();
                    })
                }
            });
        })
    },
    //批量或单个查询用户详情
    info(listArr) {
        let sql = `SELECT * FROM userinfo WHERE userid IN (${listArr});`;
        return exec(sql);
    }
}



module.exports = Friend;