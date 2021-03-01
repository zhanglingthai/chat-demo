const express = require('express');
const router = express.Router();
const User = require('../models').user;

router.get('/info', User.info);
router.post('/info', User.info);
router.post('/editPwd', User.editPwd);
router.post('/editInfo', User.editInfo);

module.exports = router;