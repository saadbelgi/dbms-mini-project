const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    console.log(req.body);
    var stmt2 = ``, stmt3 = ``, stmt4 = ``, stmt5 = ``, stmt6 = ``;
    if (req.body.preferred_floor) {
        stmt2 = ` PREFERRED_FLOOR=${req.body.preferred_floor}, `
    }
    if (req.body.preferred_size) {
        stmt3 = ` PREFERRED_SIZE=${req.body.preferred_size}, `
    }
    if (req.body.prefers_pet_allowance) {
        stmt4 = ` PREFERS_PET_ALLOWANCE=${req.body.prefers_pet_allowance}, `
    }
    if (req.body.preferred_furnishing_status) {
        stmt5 = ` PREFERRED_FURNISHING_STATUS="${req.body.preferred_furnishing_status}", `
    }
    if (req.body.preferred_house_type) {
        stmt6 = ` PREFERRED_HOUSE_TYPE="${req.body.preferred_house_type}",`
    }
    var stmt = `UPDATE HOMESEEKER SET PREFERRED_CITY=NULLIF("${req.body.preferred_city}",""), PREFERRED_AREA=NULLIF("${req.body.preferred_area}",""), ` + stmt6 + stmt2 + stmt3 + `NO_OF_ROOMS=${req.body.no_of_rooms}, ` + stmt4 + stmt5 + `NO_OF_PARKING_SPACES=${req.body.no_of_parking_spaces} WHERE USER_ID=${req.session.user_id};`;
    console.log(stmt);
    // console.log(req.body.preferred_floor);
    (async () => {
        try {
            await conn.query(stmt);
            var cat = await conn.query(`SELECT CATEGORY FROM USER WHERE USER_ID=${req.session.user_id}`);
            if (cat[0].CATEGORY == 1) {
                res.redirect('/tenant-info');
            }
            else {
                res.redirect('/buyer-info');
            }
        }
        catch (err) {
            console.log(err.message);
            res.end();
        }
    })();
});

module.exports = router