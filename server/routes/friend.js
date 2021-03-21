const express = require('express');
const router = express.Router();
const Friend = require('../controller').friend;
const util = require('../common/util');
const createError = require('http-errors');

router.get('/list', (req, res, next) => {
    const userid = util.tokenDecrypt(req.token).userid;
    const getResult = Friend.list({ userid });
    getResult.then(result => {
            res.json({ success: true, data: result, msg: '获取成功' });
        })
        .catch(err => {
            next(createError(500, err));
        })
});
router.get('/info', (req, res, next) => {
    const userid = req.query.userid || '';
    if (!userid) {
        return next(createError(500, '参数错误'));
    }
    const getResult = Friend.info(userid);
    getResult.then(result => {
            res.json({ success: true, data: result, msg: '获取成功' });
        })
        .catch(err => {
            next(createError(500, err));
        })
});

router.post('/infos', (req, res, next) => {
    const userid = req.body.userid || [];

    if (!userid.length) {
        return next(createError(500, '参数错误'));
    }
    const getResult = Friend.info(userid);
    getResult.then(result => {
            res.json({ success: true, data: result, msg: '获取成功' });
        })
        .catch(err => {
            next(createError(500, err));
        })
});

module.exports = router;