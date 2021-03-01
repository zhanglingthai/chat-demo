const pool = require('../clients/mysql').pool;
const createError = require('http-errors');
const util = require('../common/util');

const User = {
    check(req, res, next) {
        const username = req.body.username;

        if (!username || username.length < 7) {
            next(createError(500, '账号规则不正确'));
            return;
        }

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT id FROM user Where username = ?', [username], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (!results.length) {
                            res.json({ success: true, msg: '用户名不存在' });
                        } else {
                            next(createError(500, '用户名已存在'));
                        }
                    }
                    conn.release();
                })
            }
        });
    },
    reg(req, res, next) {
        const username = req.body.username,
            password = req.body.password;

        if (!username || username.length < 6 || username.length > 15) {
            next(createError(500, '账号规则不正确'));
            return;
        }

        // if (!password || password.length < 8 || password.length > 20) {
        //     next(createError(500, '密码规则不正确'));
        //     return;
        // }



        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {

                conn.beginTransaction(err => {
                    if (err) {
                        next(createError(500, err));
                        return;
                    }

                    conn.query('SELECT id FROM user Where username = ?', [username], (err, results, fields) => {
                        if (err) {
                            return conn.rollback(() => {
                                next(createError(500, err));
                            });
                        }

                        if (results.length) {
                            next(createError(500, '用户名已存在'));
                            conn.release();
                            return;
                        }

                        conn.query('INSERT INTO user SET ?', { username, password: util.aesEncrypt(password) }, (err, results, fields) => {
                            if (err) {
                                return conn.rollback(() => {
                                    next(createError(500, err));
                                });
                            }
                            conn.commit(err => {
                                if (err) {
                                    return conn.rollback(() => {
                                        next(createError(500, err));
                                    });
                                }
                                //获取token丢出去
                                const token = util.tokenEncrypt(username);
                                res.cookie('token', token);
                                res.cookie('username', username);
                                res.json({ success: true, msg: '注册成功', token });
                                conn.release();
                            })
                        })
                    })
                })
            }
        });
    },
    login(req, res, next) {
        const username = req.body.username,
            password = req.body.password;

        if (!username || username.length < 6 || username.length > 15) {
            next(createError(500, '账号规则不正确'));
            return;
        }

        if (!password || password.length < 8 || password.length > 20) {
            next(createError(500, '密码规则不正确'));
            return;
        }

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT password FROM user Where username = ?', [username], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (!results.length) {
                            next(createError(500, '用户名不存在'));
                        } else {
                            if (password == util.aesDecrypt(results[0].password)) {
                                //获取token丢出去
                                const token = util.tokenEncrypt(username);
                                res.cookie('token', token);
                                res.cookie('username', username);
                                res.json({ success: true, msg: '登陆成功', token });
                            } else {
                                next(createError(500, '密码错误'));
                            }
                        }
                    }
                    conn.release();
                })
            }
        });
    },
    info(req, res, next) {
        const username = util.tokenDecrypt(req.token).username;

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT * FROM user Where username = ?', [username], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (results.length) {
                            res.json({ success: true, msg: results });
                        } else {
                            next(createError(500, '用户名不存在'));
                        }
                    }
                    conn.release();
                })
            }
        });
    },
    editPwd(req, res, next) {
        const username = util.tokenDecrypt(req.token).username,
            oldPwd = req.body.oldPassword,
            newPwd = req.body.newPassword;

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {

                conn.beginTransaction(err => {

                    if (err) {
                        next(createError(500, err));
                        return;
                    }

                    conn.query('SELECT password FROM user Where username = ?', [username], (err, results, fields) => {
                        if (err) {
                            return conn.rollback(() => {
                                next(createError(500, err));
                            });
                        }
                        if (!results.length) {
                            next(createError(500, '用户名不存在'));
                            conn.release();
                            return;
                        }

                        if (util.aesDecrypt(results[0].password) != oldPwd) {
                            next(createError(500, '当前密码错误'));
                            conn.release();
                            return;
                        }

                        conn.query('UPDATE user SET password = ? WHERE username = ?', [util.aesEncrypt(newPwd), username], (err, results, fields) => {
                            if (err) {
                                return conn.rollback(() => {
                                    next(createError(500, err));
                                });
                            }
                            conn.commit(err => {
                                if (err) {
                                    return conn.rollback(() => {
                                        next(createError(500, err));
                                    });
                                }

                                res.json({ success: true, msg: '密码修改成功' });
                                conn.release();
                            })
                        })
                    })
                })
            }
        });

    }

}



module.exports = User;