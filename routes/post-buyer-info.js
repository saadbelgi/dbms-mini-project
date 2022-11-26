const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    (async () => {
        try {

            await conn.query(`UPDATE TENANT SET GOVT_ID_TYPE=${req.body.govt_id_type}, GOVT_ID_NUMBER="${req.body.govt_id_number}" WHERE USER_ID=${req.session.user_id};`);
            res.redirect('/login');
        } catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
});

module.exports = router