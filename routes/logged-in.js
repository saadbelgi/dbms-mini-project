const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    var stmt = `SELECT F_NAME,M_NAME,L_NAME,USER_ID,EMAIL,PASSWORD,CATEGORY FROM USER WHERE EMAIL="${req.body.email}"`;
    (async () => {
        try {
            var result = await conn.query(stmt);
            if (result.length == 0) {
                // make this look better
                res.send(`Your email ID ${req.body.email} is not registered on our website. Please use another email ID to login or create an account with this ID.`);
            }
            else if (result[0].PASSWORD == req.body.password) {
                req.session.user_id = result[0].USER_ID;
                if (result[0].CATEGORY == 3) {
                    var houses, on_rent, on_sale;
                    (async () => {
                        houses = await conn.query(`SELECT * FROM HOUSE WHERE OWNER_ID=${req.session.user_id}`);
                        console.log(houses)
                        for (let i = 0; i < houses.length; i++) {
                            if (houses[i].CATEGORY == 1) {
                                on_rent = await conn.query(`SELECT * FROM RENT WHERE HOUSE_ID = ${houses[i].HOUSE_ID}`);
                                houses[i] = Object.assign(houses[i], on_rent[0])
                            }
                            else {
                                on_sale = await conn.query(`SELECT * FROM SALE WHERE HOUSE_ID = ${houses[i].HOUSE_ID}`);
                                houses[i] = Object.assign(houses[i], on_sale[0])
                            }
                        }
                        var data = { user: result[0], houses: houses }
                        res.render('home.ejs', data)
                    })();
                }
                else {
                    res.render('home.ejs', result[0]);
                }
            }
            else {
                // might have to changE this
                res.send('Your password is wrong.')
            }
        }
        catch (err) {
            console.log(err.message);
            next();
        }
    })();
});

module.exports = router