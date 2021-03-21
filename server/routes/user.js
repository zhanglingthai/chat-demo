const express = require('express');
const router = express.Router();
const User = require('../controller').user;
const util = require('../common/util');
const moment = require('moment');
const createError = require('http-errors');

router.get('/info', (req, res, next) => {
    const userid = util.tokenDecrypt(req.token).userid;

    const getResult = User.info({ userid });
    getResult.then(result => {
            result[0].create_time = moment(result[0].create_time).format('Y-MM-DD HH:mm:ss');
            res.json({ success: true, data: result[0], msg: '获取成功', token: req.token });
        })
        .catch(err => {
            next(createError(500, err));
        })
});
router.post('/editpwd', (req, res, next) => {
    const username = util.tokenDecrypt(req.token).username,
        oldPwd = req.body.oldPassword,
        newPwd = req.body.newPassword;
    const getResult = User.editPwd({ username, oldPwd, newPwd });
    getResult.then(() => {
            res.json({ success: true, msg: '密码修改成功' });
        })
        .catch(err => {
            next(createError(500, err));
        })
});
router.post('/editInfo', (req, res, next) => {
    const userid = util.tokenDecrypt(req.token).userid;
    let infoOpt = req.body;


    const getResult = User.editInfo({ userid, infoOpt });
    getResult.then(() => {
            res.json({ success: true, msg: '修改成功' });
        })
        .catch(err => {
            next(createError(500, err));
        })
});

module.exports = router;