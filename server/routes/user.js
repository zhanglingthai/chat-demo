const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const User = require('../models').user;

router.get('/info', User.info);
router.post('/info', User.info);
router.post('/editPwd', User.editPwd);

module.exports = router;