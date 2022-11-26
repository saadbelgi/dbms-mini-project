const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    (async () => {
        try {
            var stmt = `INSERT INTO HOMEOWNER VALUES(${req.session.user_id},"${req.body.govt_id_type}","${req.body.govt_id_number}")`
            console.log(stmt)
            await conn.query(stmt);
            res.redirect('/login');
        } catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
});

module.exports = router