var express = require('express');
var router = express.Router();
var path = require('path');

router.all('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public', 'buyer_info.html'));
})

module.exports = router;
