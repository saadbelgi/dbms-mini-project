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
                    (async () => {
                        var stmt = `SELECT * FROM HOMESEEKER WHERE USER_ID=${result[0].USER_ID}`;
                        var stmt2;
                        if(result[0].CATEGORY == 1) {
                            stmt2 = `SELECT * FROM TENANT WHERE USER_ID=${result[0].USER_ID}`;
                        }
                        else {
                            stmt2 = `SELECT * FROM BUYER WHERE USER_ID=${result[0].USER_ID}`;
                        }
                        var temp1 = await conn.query(stmt);
                        var temp2 = await conn.query(stmt2);
                        console.log(stmt);
                        console.log(stmt2);
                        console.log(temp1);
                        console.log(temp2);
                        var temp3, stmt3;
                        if(result[0].CATEGORY == 1) {
                            stmt3 = `SELECT * FROM HOUSE NATURAL JOIN RENT WHERE ${temp1[0].PREFERRED_CITY ? `CITY="`+temp1[0].PREFERRED_CITY+`"` : ``} ${temp1[0].PREFERRED_AREA ? `AND AREA="`+temp1[0].PREFERRED_AREA+`"` : ``} ${temp1[0].PREFERRED_HOUSE_TYPE ? `AND TYPE="`+temp1[0].PREFERRED_HOUSE_TYPE+`"` : ``} ${temp1[0].PREFERRED_SIZE ? `AND SIZE>=`+temp1[0].PREFERRED_SIZE : ``} ${temp1[0].PREFERS_PET_ALLOWANCE ? `AND PET_ALLOWANCE=`+temp1[0].PREFERS_PET_ALLOWANCE : ``}  ${temp1[0].PREFERRED_SIZE ? `AND SIZE>=`+temp1[0].PREFERRED_SIZE : ``} ${temp1[0].NO_OF_ROOMS ? `AND NO_OF_ROOMS>=`+temp1[0].NO_OF_ROOMS : ``} ${temp1[0].PREFERRED_FURNISHING_STATUS ? `AND FURNISHING_STATUS="`+temp1[0].PREFERRED_FURNISHING_STATUS+`"` : ``} ${temp1[0].NO_OF_PARKING_SPACES ? `AND NO_OF_PARKING_SPACES>=`+temp1[0].NO_OF_PARKING_SPACES : ``} ${temp2[0].MAX_RENT ? `AND MONTHLY_RENT<=`+temp2[0].MAX_RENT : ``} ${temp2[0].MARITAL_STATUS ? `AND TENANT_MARITAL_STATUS=`+temp2[0].MARITAL_STATUS : ``} ${temp2[0].FOOD_HABIT ? `AND TENANT_FOOD_HABIT=`+temp2[0].FOOD_HABIT : ``} AND 1=1`;
                            if (stmt3.search(/WHERE\s*AND/) != -1) {
                                let idx = stmt3.search(/AND/);
                                let firstPart = stmt3.substring(0, idx);
                                let lastPart = stmt3.substring(idx + 3);
                                stmt3 = firstPart + lastPart;
                            }
                            console.log(stmt3);
                            temp3 = await conn.query(stmt3);
                            var data = {user: result[0], houses: temp3};
                            res.render('home.ejs', data);
                        }
                        else {
                            stmt3 = `SELECT * FROM HOUSE NATURAL JOIN SALE WHERE ${temp1[0].PREFERRED_CITY ? `CITY="`+temp1[0].PREFERRED_CITY+`"` : ``} ${temp1[0].PREFERRED_AREA ? `AND AREA="`+temp1[0].PREFERRED_AREA+`"` : ``} ${temp1[0].PREFERRED_HOUSE_TYPE ? `AND TYPE="`+temp1[0].PREFERRED_HOUSE_TYPE+`"` : ``} ${temp1[0].PREFERRED_SIZE ? `AND SIZE>=`+temp1[0].PREFERRED_SIZE : ``} ${temp1[0].PREFERS_PET_ALLOWANCE ? `AND PET_ALLOWANCE=`+temp1[0].PREFERS_PET_ALLOWANCE : ``}  ${temp1[0].PREFERRED_SIZE ? `AND SIZE>=`+temp1[0].PREFERRED_SIZE : ``} ${temp1[0].NO_OF_ROOMS ? `AND NO_OF_ROOMS>=`+temp1[0].NO_OF_ROOMS : ``} ${temp1[0].PREFERRED_FURNISHING_STATUS ? `AND FURNISHING_STATUS="`+temp1[0].PREFERRED_FURNISHING_STATUS+`"` : ``} ${temp1[0].NO_OF_PARKING_SPACES ? `AND NO_OF_PARKING_SPACES>=`+temp1[0].NO_OF_PARKING_SPACES : ``} ${temp2[0].MAX_PRICE ? `AND TOTAL_PRICE<=`+temp2[0].MAX_PRICE : ``} AND 1=1`;
                            if (stmt3.search(/WHERE\s*AND/) != -1) {
                                let idx = stmt3.search(/AND/);
                                let firstPart = stmt3.substring(0, idx);
                                let lastPart = stmt3.substring(idx + 3);
                                stmt3 = firstPart + lastPart;
                            }
                            console.log(stmt3);
                            temp3 = await conn.query(stmt3);
                            var data = {user: result[0], houses: temp3};
                            res.render('home.ejs', data);
                        }
                    })();
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