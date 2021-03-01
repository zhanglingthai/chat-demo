const express = require('express');
const router = express.Router();
const Friend = require('../models').friend;

router.get('/list', Friend.list);
router.get('/info', Friend.info);

module.exports = router;