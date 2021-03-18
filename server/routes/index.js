const express = require('express');
const router = express.Router();
const User = require('../models').user;

router.get('/checkUsername', User.checkUsername);
router.post('/reg', User.reg);
router.post('/login', User.login);
router.get('/loginout', User.loginOut);

module.exports = router;