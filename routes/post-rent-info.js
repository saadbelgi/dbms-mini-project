const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    // console.log(req.body)
    // console.log(stmt);
    (async () => {
        try {
            var temp = await conn.query(`SELECT HOUSE_ID FROM RENT NATURAL JOIN HOUSE WHERE OWNER_ID=${req.session.user_id}`)
            var max = temp[0].HOUSE_ID
            temp.forEach(element => {
                max = element.HOUSE_ID > max ? element.HOUSE_ID : max;
            });
            var stmt = `UPDATE RENT SET MONTHLY_RENT=${req.body.monthly_rent} ${req.body.max_no_of_tenants ? `,MAX_NO_OF_TENANTS=`+req.body.max_no_of_tenants : ``} ${req.body.tenant_marital_status ? `,TENANT_MARITAL_STATUS=`+req.body.tenant_marital_status : ``} ${req.body.tenant_food_habit ? `,TENANT_FOOD_HABIT=`+req.body.tenant_food_habit : ``} ${req.body.security_deposit_amount ? `,SECURITY_DEPOSIT_AMOUNT=`+req.body.security_deposit_amount : ``} WHERE HOUSE_ID=${max}`;
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