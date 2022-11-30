var express = require('express');
var router = express.Router();
var path = require('path');

router.all('/', (req, res) => {
    // res.sendFile(path.join(__dirname,'..','public', 'login.html'));
    res.render('search.ejs',{});
})

module.exports = router;
