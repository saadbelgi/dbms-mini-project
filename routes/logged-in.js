const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    var stmt = `SELECT F_NAME,M_NAME,L_NAME,USER_ID,EMAIL,PASSWORD FROM USER WHERE EMAIL="${req.body.email}"`;
    (async () => {
        try {
            var result = await conn.query(stmt);
            if (result.length == 0) {
                // make this look better
                res.send(`Your email ID ${req.body.email} is not registered on our website. Please use another email ID to login or create an account with this ID.`);
            }
            else if (result[0].PASSWORD == req.body.password) {
                req.session.user_id = result[0].USER_ID;
                res.render('home.ejs', result[0]);
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