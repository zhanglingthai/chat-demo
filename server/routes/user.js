var express = require('express');
var router = express.Router();




router.get('/edit', function(req, res, next) {
    let arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(i)
    }
    res.json({
        success: true,
        data: arr
    })
});



module.exports = router;