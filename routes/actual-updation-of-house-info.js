var express = require('express');
var router = express.Router();
var path = require('path');
const conn = require('../database');

function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);

    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

router.post('/', (req, res) => {
    var temp;
    var stmt1, stmt2, stmt3;
    stmt1 = `UPDATE HOUSE SET ${req.body.state ? `STATE="` + req.body.state + `"` : ``} ${req.body.city ? `,CITY="` + req.body.city + `"` : ``} ${req.body.area ? `,AREA="` + req.body.area + `"` : ``} ${req.body.pincode ? `,PINCODE="` + req.body.pincode + `"` : ``} ${req.body.type ? `,TYPE=` + req.body.type : ``} ${req.body.floor ? `,FLOOR=` + req.body.floor : ``} ${req.body.size ? `,SIZE=` + req.body.size : ``} ${req.body.no_of_rooms ? `,NO_OF_ROOMS=` + req.body.no_of_rooms : ``} ${req.body.furnishing_status ? `,FURNISHING_STATUS="` + req.body.furnishing_status + `"` : ``} ${req.body.no_of_parking_spaces ? `,NO_OF_PARKING_SPACES=` + req.body.no_of_parking_spaces : ``} ${req.body.pet_allowance ? `,PET_ALLOWANCE=` + req.body.pet_allowance : ``} ${req.body.bought_in ? `,BOUGHT_IN=` + req.body.bought_in : ``} ${req.body.no_of_bathrooms ? `,NO_OF_BATHROOMS=` + req.body.no_of_bathrooms : ``} ${req.body.water_availibility ? `,WATER_AVAILABILITY=` + req.body.water_availibility : ``} WHERE HOUSE_ID=${req.body.house_id}`;
    temp = stmt1.search(/SET\s*,/);
    if (temp != -1) {
        stmt1 = replaceChar(stmt1, '', stmt1.search(/,/))
    }
    console.log(stmt1);
    stmt2 = `UPDATE RENT SET ${req.body.monthly_rent ? `MONTHLY_RENT=` + req.body.monthly_rent : ``} ${req.body.max_no_of_tenants ? `,MAX_NO_OF_TENANTS=` + req.body.max_no_of_tenants : ``} ${req.body.tenant_marital_status ? `,TENANT_MARITAL_STATUS=` + req.body.tenant_marital_status : ``} ${req.body.tenant_food_habit ? `,TENANT_FOOD_HABIT=` + req.body.tenant_food_habit : ``} ${req.body.security_deposit_amount ? `,SECURITY_DEPOSIT_AMOUNT=` + req.body.security_deposit_amount : ``}  WHERE HOUSE_ID=${req.body.house_id}`
    console.log(stmt2);
    temp = stmt2.search(/SET\s*,/);
    if (temp != -1) {
        stmt2 = replaceChar(stmt2, '', stmt2.search(/,/))
    }
    console.log(stmt2);
    stmt3 = `UPDATE SALE SET ${req.body.total_price ? `TOTAL_PRICE=` + req.body.total_price : ``} ${req.body.token_amount ? `,TOKEN_AMOUNT=` + req.body.token_amount : ``}  WHERE HOUSE_ID=${req.body.house_id}`
    console.log(stmt3);
    temp = stmt1.search(/SET\s*,/);
    if (temp != -1) {
        stmt3 = replaceChar(stmt3, '', stmt3.search(/,/))
    }
    console.log(stmt3);
    var result;
    (async () => {
        if (stmt1.search(/SET\s*WHERE/) == -1)
            await conn.query(stmt1);
        if (stmt2.search(/SET\s*WHERE/) == -1)
            await conn.query(stmt2);
        if (stmt3.search(/SET\s*WHERE/) == -1)
            await conn.query(stmt3);
        result = await conn.query(`SELECT F_NAME,M_NAME,L_NAME,USER_ID,EMAIL,PASSWORD,CATEGORY FROM USER WHERE USER_ID=${req.session.user_id}`);
        houses = await conn.query(`SELECT * FROM HOUSE WHERE OWNER_ID=${req.session.user_id}`);
        // var on_rent, on_sale;
        var houses, on_rent, on_sale;
        houses = await conn.query(`SELECT * FROM HOUSE WHERE OWNER_ID=${req.session.user_id}`);
        // console.log(houses)
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
        // console.log(result[0]);
        // console.log(houses);
        // var data = { user: result[0], houses: houses }
        // console.log(data);
        // res.render('home.ejs', data);
    })();
})

module.exports = router;
