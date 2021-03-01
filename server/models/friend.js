const pool = require('../clients/mysql').pool;
const createError = require('http-errors');
const util = require('../common/util');

const Friend = {
    list(req, res, next) {
        // const username = req.body.username;

        // if (!username || username.length < 7) {
        //     next(createError(500, '账号规则不正确'));
        //     return;
        // }

        // pool.getConnection((err, conn) => {
        //     if (err) {
        //         next(createError(500, err));
        //     } else {
        //         conn.query('SELECT id FROM user Where username = ?', [username], (err, results) => {
        //             if (err) {
        //                 next(createError(500, err));
        //             } else {
        //                 if (!results.length) {
        //                     res.json({ success: true, msg: '用户名不存在' });
        //                 } else {
        //                     next(createError(500, '用户名已存在'));
        //                 }
        //             }
        //             conn.release();
        //         })
        //     }
        // });
    },
    info(req, res, next) {
        // const username = req.body.username;

        // if (!username || username.length < 7) {
        //     next(createError(500, '账号规则不正确'));
        //     return;
        // }

        // pool.getConnection((err, conn) => {
        //     if (err) {
        //         next(createError(500, err));
        //     } else {
        //         conn.query('SELECT id FROM user Where username = ?', [username], (err, results) => {
        //             if (err) {
        //                 next(createError(500, err));
        //             } else {
        //                 if (!results.length) {
        //                     res.json({ success: true, msg: '用户名不存在' });
        //                 } else {
        //                     next(createError(500, '用户名已存在'));
        //                 }
        //             }
        //             conn.release();
        //         })
        //     }
        // });
    }
}



module.exports = Friend;