const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res) => {
    var date = new Date().toISOString().slice(0, 10);
    var stmt = `INSERT INTO USER (EMAIL, PASSWORD, ACCT_CREATION_DATE, LAST_ACTIVE_DATE) VALUES ("${req.body.email}", "${req.body.password}", "${date}", "${date}")`;
    (async () => {
        try {
            await conn.query(stmt);
            var result = await conn.query(`SELECT USER_ID FROM USER WHERE EMAIL="${req.body.email}"`);
            req.session.user_id = result[0].USER_ID;
            res.redirect('/user-info');
        }
        catch (err) {
            console.log(err);
            if (err.message.includes('ER_DUP_ENTRY')) {
                // send a page which has login and create account links
                res.send(
                    `Your email ID ${req.body.email} is already registered!<br>Please login with this email or use another ID<br>
                    <a href="/create">Create account</a><br>
                    <a href="/login">Login</a>
                    `
                );
            }
        }
    })();
});

module.exports = router