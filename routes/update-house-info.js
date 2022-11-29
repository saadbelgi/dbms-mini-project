var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/', (req, res) => {
    res.render('update-house-info.ejs',req.body);
})

module.exports = router;
