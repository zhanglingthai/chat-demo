const express = require('express');
const router = express.Router();
const User = require('../models').user;

router.post('/checkUser', User.check);
router.post('/reg', User.reg);
router.post('/login', User.login);

module.exports = router;