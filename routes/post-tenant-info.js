const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    var stmt2 = ``, stmt3 = ``;
    if (req.body.marital_status) {
        stmt2 = `, MARITAL_STATUS=${req.body.marital_status} `
    }
    if (req.body.food_habit) {
        stmt3 = `, FOOD_HABIT=${req.body.food_habit} `
    }
    var stmt = `UPDATE TENANT SET MAX_RENT=${req.body.max_rent}, MAX_NO_OF_ROOMMATES=${req.body.max_no_of_roommates} ` + stmt2 + stmt3 + ` WHERE USER_ID=${req.session.user_id};`;
    console.log(stmt);
    (async () => {
        try {
            await conn.query(stmt);
            res.redirect('/login');
        } catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
});

module.exports = router