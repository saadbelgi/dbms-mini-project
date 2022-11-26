const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    (async () => {
        try {
            await conn.query(`UPDATE BUYER SET MAX_PRICE=${req.body.max_price} WHERE USER_ID=${req.session.user_id};`);
            res.redirect('/login')
        } catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
});

module.exports = router