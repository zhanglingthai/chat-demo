const express = require('express');
const router = express.Router();
const User = require('../models').user;

router.post('/checkUser', User.check);
router.post('/reg', User.reg);
router.post('/login', User.login);
router.get('/loginout', User.loginOut);

router.get('/iotest', (req,res,next) =>{
	res.render('iotest');
});
router.all('/test', (req,res,next) =>{
	res.json({1:1});
});

module.exports = router;