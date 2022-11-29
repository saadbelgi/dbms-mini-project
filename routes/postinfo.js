const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res) => {
    var stmt = `UPDATE USER SET F_NAME="${req.body.f_name}", L_NAME="${req.body.l_name}", DOB="${req.body.dob}", GENDER="${req.body.gender}", STATE="${req.body.state}", CITY="${req.body.city}", AREA="${req.body.area}", PINCODE="${req.body.pincode}", CATEGORY=${req.body.category} WHERE USER_ID=${req.session.user_id};`;
    (async () => {
        try {
            await conn.query(stmt);
            if (Array.isArray(req.body.phoneno)) {
                for (var phno of req.body.phoneno) {
                    await conn.query(`INSERT INTO USER_PHONE_NO VALUES(${req.session.user_id},"${phno}");`);
                }
            }
            else {
                await conn.query(`INSERT INTO USER_PHONE_NO VALUES(${req.session.user_id},"${req.body.phoneno}");`);
            }
            var table = req.body.category == 1 ? 'TENANT' : 'BUYER';
            await conn.query(`INSERT INTO ${table} (USER_ID) VALUES(${req.session.user_id})`);
            if (req.body.category != 3) {
                await conn.query(`INSERT INTO HOMESEEKER (USER_ID) VALUES(${req.session.user_id})`);
                res.redirect('/homeseeker-info')
            }
            else {
                res.redirect('/homeowner-info')
            }
        }
        catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
})

module.exports = router