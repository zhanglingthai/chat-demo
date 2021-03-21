const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../controller').user;
const util = require('../common/util');

router.get('/checkUsername', (req, res, next) => {
    const username = req.query.username || '';

    if (!username || username.length < 7) {
        return next(createError(500, '账号规则不正确'));
    }

    const getResult = User.checkUsername({ username });
    getResult.then(result => {
            if (result.length) {
            	next(createError(500, '用户名已存在'));
            } else {
                res.json({ success: true, msg: '用户名不存在' });
            }
        })
        .catch(err => {
            next(createError(500, err));
        })


});
router.post('/reg', (req, res, next) => {
    const username = req.body.username || '',
        password = req.body.password || '';

    if (!username || username.length < 6 || username.length > 15) {
        return next(createError(500, '账号为6-15位字符'));
    }
    const getResult = User.reg({ username, password });
    getResult.then(result => {
            const userid = result;
            //获取token丢出去
            const token = util.tokenEncrypt({ username, userid });
            res.cookie('token', token);
            res.cookie('uid', userid);
            res.json({ success: true, msg: '注册成功', token });
        })
        .catch(err => {
        	next(createError(500, err));
        })

});
router.post('/login', (req, res, next) => {
    const username = req.body.username || '';

    if (!username || username.length < 6 || username.length > 15) {
        return next(createError(500, '账号规则不正确'));
    }

    const getResult = User.login({ username });
    getResult.then(result => {
            if (result.length) {
                const { userid, password, status } = result[0];

                if (status == 0) {
                    res.clearCookie("token");
                    res.clearCookie("uid");
                    return next(createError(500, '该账户已冻结，请联系客服'));
                } else if (status == 2) {
                    res.clearCookie("token");
                    res.clearCookie("uid");
                    return next(createError(500, '该账户已停用，请联系客服'));
                }

                if (req.body.password == util.aesDecrypt(password)) {
                    //获取token丢出去
                    const token = util.tokenEncrypt({ username, userid });
                    res.cookie('token', token);
                    res.cookie('uid', userid);
                    res.json({ success: true, msg: '登陆成功', token });
                } else {
                    next(createError(500, '密码错误'));
                }

            } else {
            	next(createError(500, '账号不存在'));
            }
        })
        .catch(err => {
            next(createError(500, err));
        })

});
router.get('/loginout', (req, res, next) => {
    res.clearCookie("token");
    res.clearCookie("uid");
    res.json({ success: true, msg: '退出成功' });
});

module.exports = router;