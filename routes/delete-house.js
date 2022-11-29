const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    var stmt = `DELETE FROM HOUSE WHERE HOUSE_ID=${req.body.house_id}`;
    var result, houses;
    (async () => {
        await conn.query(stmt);
        result = await conn.query(`SELECT F_NAME,M_NAME,L_NAME,USER_ID,EMAIL,PASSWORD,CATEGORY FROM USER WHERE USER_ID=${req.session.user_id}`);
        houses = await conn.query(`SELECT * FROM HOUSE WHERE OWNER_ID=${req.session.user_id}`);
        var on_rent, on_sale;
        houses.forEach(element => {
            if (element.CATEGORY == 1) {
                (async () => {
                    on_rent = await conn.query(`SELECT * FROM RENT WHERE HOUSE_ID = ${element.HOUSE_ID}`);
                    for (var key in on_rent) {
                        element[key] = on_rent[key];
                    }
                })();
            }
            else {
                (async () => {
                    on_sale = await conn.query(`SELECT * FROM SALE WHERE HOUSE_ID = ${element.HOUSE_ID}`);
                    for (var key in on_rent) {
                        element[key] = on_sale[key];
                    }
                })();
            }
        });
        // console.log(result[0]);
        // console.log(houses);
        var data = {user: result[0], houses: houses}
        console.log(data);
        res.render('home.ejs', data);
    })();
});

module.exports = router