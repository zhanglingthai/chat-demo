const pool = require('../clients/mysql').pool;
const createError = require('http-errors');
const util = require('../common/util');
const moment = require('moment');

const User = {
    checkUsername(req, res, next) {
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

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {

                conn.beginTransaction(err => {
                    if (err) {
                        next(createError(500, err));
                        return;
                    }

                    conn.query('SELECT userid FROM user Where username = ?', [username], (err, results, fields) => {
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

                            let userid = results.insertId;

                            conn.query('INSERT INTO userinfo SET ?', { userid }, (err, results, fields) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        next(createError(500, err));
                                    });
                                }

                                conn.query('INSERT INTO friends SET ?', { userid }, (err, results, fields) => {
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
                                        const token = util.tokenEncrypt({ username, userid });
                                        res.cookie('token', token);
                                        res.cookie('uid', userid);
                                        res.json({ success: true, msg: '注册成功', token });
                                        conn.release();
                                    })
                                })

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

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT userid,password,status FROM user Where username = ?', [username], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (!results.length) {
                            next(createError(500, '用户名不存在'));
                            return;
                        }
                        if (results[0].status == 0) {
                            res.clearCookie("token");
                            res.clearCookie("uid");
                            next(createError(500, '该账户已冻结，请联系客服'));
                            return;
                        } else if (results[0].status == 2) {
                            res.clearCookie("token");
                            res.clearCookie("uid");
                            next(createError(500, '该账户已停用，请联系客服'));
                            return;
                        }

                        if (password == util.aesDecrypt(results[0].password)) {
                            //获取token丢出去
                            const token = util.tokenEncrypt({ username, userid: results[0].userid });
                            res.cookie('token', token);
                            res.cookie('uid', results[0].userid);
                            res.json({ success: true, msg: '登陆成功', token });
                        } else {
                            next(createError(500, '密码错误'));
                        }

                    }
                    conn.release();
                })
            }
        });
    },
    loginOut(req, res) {
        res.clearCookie("token");
        res.clearCookie("uid");
        res.json({ success: true, msg: '退出成功' });
    },
    info(req, res, next) {
        const userid = util.tokenDecrypt(req.token).userid;

        pool.getConnection((err, conn) => {
            if (err) {
                next(createError(500, err));
            } else {
                conn.query('SELECT * FROM userinfo Where userid = ?', [userid], (err, results) => {
                    if (err) {
                        next(createError(500, err));
                    } else {
                        if (results.length) {
                            let data = results[0];
                            data.create_time = moment(data.create_time).format('Y-MM-DD HH:mm:ss');
                            data.update_time = moment(data.update_time).format('Y-MM-DD HH:mm:ss');

                            res.json({ success: true, data, token: req.token });
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
    },
    editInfo(req, res, next) {


    }

}



module.exports = User;