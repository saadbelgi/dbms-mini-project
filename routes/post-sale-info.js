const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    console.log(req.body);
    (async () => {
        try {
            var temp = await conn.query(`SELECT HOUSE_ID FROM SALE NATURAL JOIN HOUSE WHERE OWNER_ID=${req.session.user_id}`)
            var max = temp[0].HOUSE_ID
            temp.forEach(element => {
                max = element.HOUSE_ID > max ? element.HOUSE_ID : max;
            });
            var stmt = `UPDATE SALE SET TOTAL_PRICE=${req.body.total_price} ${req.body.token_amount ? `,TOKEN_AMOUNT=`+req.body.token_amount : ``} WHERE HOUSE_ID=${max}`;
            console.log(stmt);
            await conn.query(stmt);
            res.redirect('/login');
        }
        catch(err) {
            console.log(err.message)
            res.end()
        }
    })()
});

module.exports = router