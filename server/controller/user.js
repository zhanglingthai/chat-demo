const { pool, exec } = require('../clients/mysql');
const util = require('../common/util');

const User = {
    checkUsername({ username }) {
        let sql = `SELECT userid FROM user Where username = "${username}" `;
        return exec(sql);
    },
    reg({ username, password }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {

                    conn.beginTransaction(err => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        conn.query('SELECT userid FROM user Where username = ?', [username], (err, results, fields) => {
                            if (err) {
                                return conn.rollback(() => {
                                    reject(err);
                                });
                            }

                            if (results.length) {
                                reject('用户名已存在');
                                conn.release();
                                return;
                            }

                            conn.query('INSERT INTO user SET ?', { username, password: util.aesEncrypt(password) }, (err, results, fields) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        reject(err);
                                    });
                                }

                                let userid = results.insertId;

                                conn.query('INSERT INTO userinfo SET ?', { userid }, (err, results, fields) => {
                                    if (err) {
                                        return conn.rollback(() => {
                                            reject(err)
                                        });
                                    }

                                    conn.query('INSERT INTO friends SET ?', { userid }, (err, results, fields) => {
                                        if (err) {
                                            return conn.rollback(() => {
                                                reject(err);
                                            });
                                        }
                                        conn.commit(err => {
                                            if (err) {
                                                return conn.rollback(() => {
                                                    reject(err);
                                                });
                                            }
                                            resolve(userid);
                                            conn.release();
                                        })
                                    })

                                })

                            })
                        })
                    })
                }
            });

        })

    },
    login({ username }) {
        let sql = `SELECT userid,password,status FROM user Where username = "${username}" `;
        return exec(sql);
    },
    info({ userid }) {
        let sql = `SELECT userid,nickname,avatar_num,avatar_url,back_url,account,address,sign,city,birth,create_time FROM userinfo Where userid = "${userid}" `;
        return exec(sql);
    },
    editPwd({ username, oldPwd, newPwd }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {

                    conn.beginTransaction(err => {

                        if (err) {
                            reject(err);
                            return;
                        }

                        conn.query('SELECT password FROM user Where username = ?', [username], (err, results, fields) => {
                            if (err) {
                                return conn.rollback(() => {
                                    reject(err);
                                });
                            }
                            if (!results.length) {
                                reject('用户不存在');
                                conn.release();
                                return;
                            }

                            if (util.aesDecrypt(results[0].password) != oldPwd) {
                                reject('当前密码错误');
                                conn.release();
                                return;
                            }

                            conn.query('UPDATE user SET password = ? WHERE username = ?', [util.aesEncrypt(newPwd), username], (err, results, fields) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        reject(err);
                                    });
                                }
                                conn.commit(err => {
                                    if (err) {
                                        return conn.rollback(() => {
                                            reject(err);
                                        });
                                    }

                                    resolve();
                                    conn.release();
                                })
                            })
                        })
                    })
                }
            });
        })
    },
    editInfo({ userid, infoOpt }) {
        let allowKey = ['nickname', 'avatar_num', 'avatar_url', 'back_url', 'account', 'address', 'sign', 'city', 'birth']

        let sql = `UPDATE userinfo SET `,
            index = 0;

        for (let key in infoOpt) {
            if (allowKey.indexOf(key) < 0) {
                continue;
            }
            if (index) {
                sql += ',';
            }
            sql += `${key}="${infoOpt[key]}"`;
            index++;
        }

        sql += ` WHERE userid = "${userid}" `;
        return exec(sql);

    }

}



module.exports = User;