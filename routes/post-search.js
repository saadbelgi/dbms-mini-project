const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    console.log(req.body);
    var stmt, res1, res2, stmt2;
    // res.end();
    // console.log(stmt);
    (async () => {
        try {
            if (Array.isArray(req.body.category)) {
                stmt = `SELECT * FROM HOUSE NATURAL JOIN RENT WHERE ${req.body.state ? `STATE="` + req.body.state + `"` : ``} ${req.body.city ? ` AND CITY="` + req.body.city + `"` : ``} ${req.body.area ? ` AND AREA="` + req.body.area + `"` : ``} ${req.body.pincode ? ` AND PINCODE="` + req.body.pincode + `"` : ``} ${req.body.type ? ` AND TYPE=` + req.body.type : ``} ${req.body.size ? ` AND SIZE>=` + req.body.size : ``} ${req.body.no_of_rooms ? ` AND NO_OF_ROOMS>=` + req.body.no_of_rooms : ``} ${req.body.furnishing_status ? ` AND FURNISHING_STATUS="` + req.body.furnishing_status + `"` : ``} ${req.body.no_of_parking_spaces ? ` AND NO_OF_PARKING_SPACES>=` + req.body.no_of_parking_spaces : ``} ${req.body.pet_allowance ? ` AND PET_ALLOWANCE=` + req.body.pet_allowance : ``} ${req.body.bought_before ? ` AND BOUGHT_IN<=` + req.body.bought_before : ``} ${req.body.bought_after ? ` AND BOUGHT_IN>=` + req.body.bought_after : ``} ${req.body.min_monthly_rent ? ` AND MONTHLY_RENT>=` + req.body.min_monthly_rent : ``} ${req.body.max_monthly_rent ? ` AND MONTHLY_RENT<=` + req.body.max_monthly_rent : ``} AND 1=1`;
                // console.log(stmt);
                stmt2 = `SELECT * FROM HOUSE NATURAL JOIN SALE WHERE ${req.body.state ? `STATE="` + req.body.state + `"` : ``} ${req.body.city ? ` AND CITY="` + req.body.city + `"` : ``} ${req.body.area ? ` AND AREA="` + req.body.area + `"` : ``} ${req.body.pincode ? ` AND PINCODE="` + req.body.pincode + `"` : ``} ${req.body.type ? ` AND TYPE=` + req.body.type : ``} ${req.body.size ? ` AND SIZE>=` + req.body.size : ``} ${req.body.no_of_rooms ? ` AND NO_OF_ROOMS>=` + req.body.no_of_rooms : ``} ${req.body.furnishing_status ? ` AND FURNISHING_STATUS="` + req.body.furnishing_status + `"` : ``} ${req.body.no_of_parking_spaces ? ` AND NO_OF_PARKING_SPACES>=` + req.body.no_of_parking_spaces : ``} ${req.body.pet_allowance ? ` AND PET_ALLOWANCE=` + req.body.pet_allowance : ``} ${req.body.bought_before ? ` AND BOUGHT_IN<=` + req.body.bought_before : ``} ${req.body.bought_after ? ` AND BOUGHT_IN>=` + req.body.bought_after : ``} ${req.body.min_total_price ? ` AND TOTAL_PRICE>=` + req.body.min_total_price : ``} ${req.body.max_total_price ? ` AND TOTAL_PRICE<=` + req.body.max_total_price : ``} AND 1=1`;
                // console.log(stmt2);
                // res1 = await conn.query(stmt);
                // res2 = await conn.query(stmt2);
            }
            else {
                if (req.body.category == 1) {
                    stmt = `SELECT * FROM HOUSE NATURAL JOIN RENT WHERE ${req.body.state ? `STATE="` + req.body.state + `"` : ``} ${req.body.city ? ` AND CITY="` + req.body.city + `"` : ``} ${req.body.area ? ` AND AREA="` + req.body.area + `"` : ``} ${req.body.pincode ? ` AND PINCODE="` + req.body.pincode + `"` : ``} ${req.body.type ? ` AND TYPE=` + req.body.type : ``} ${req.body.size ? ` AND SIZE>=` + req.body.size : ``} ${req.body.no_of_rooms ? ` AND NO_OF_ROOMS>=` + req.body.no_of_rooms : ``} ${req.body.furnishing_status ? ` AND FURNISHING_STATUS="` + req.body.furnishing_status + `"` : ``} ${req.body.no_of_parking_spaces ? ` AND NO_OF_PARKING_SPACES>=` + req.body.no_of_parking_spaces : ``} ${req.body.pet_allowance ? ` AND PET_ALLOWANCE=` + req.body.pet_allowance : ``} ${req.body.bought_before ? ` AND BOUGHT_IN<=` + req.body.bought_before : ``} ${req.body.bought_after ? ` AND BOUGHT_IN>=` + req.body.bought_after : ``} ${req.body.min_monthly_rent ? ` AND MONTHLY_RENT>=` + req.body.min_monthly_rent : ``} ${req.body.max_monthly_rent ? ` AND MONTHLY_RENT<=` + req.body.max_monthly_rent : ``}  AND 1=1`;
                    // console.log(stmt);
                    // res1 = await conn.query(stmt)
                }
                else {
                    stmt = `SELECT * FROM HOUSE NATURAL JOIN SALE WHERE ${req.body.state ? `STATE="` + req.body.state + `"` : ``} ${req.body.city ? ` AND CITY="` + req.body.city + `"` : ``} ${req.body.area ? ` AND AREA="` + req.body.area + `"` : ``} ${req.body.pincode ? ` AND PINCODE="` + req.body.pincode + `"` : ``} ${req.body.type ? ` AND TYPE="` + req.body.type+`"` : ``} ${req.body.size ? ` AND SIZE>=` + req.body.size : ``} ${req.body.no_of_rooms ? ` AND NO_OF_ROOMS>=` + req.body.no_of_rooms : ``} ${req.body.furnishing_status ? ` AND FURNISHING_STATUS="` + req.body.furnishing_status + `"` : ``} ${req.body.no_of_parking_spaces ? ` AND NO_OF_PARKING_SPACES>=` + req.body.no_of_parking_spaces : ``} ${req.body.pet_allowance ? ` AND PET_ALLOWANCE=` + req.body.pet_allowance : ``} ${req.body.bought_before ? ` AND BOUGHT_IN<=` + req.body.bought_before : ``} ${req.body.bought_after ? ` AND BOUGHT_IN>=` + req.body.bought_after : ``} ${req.body.min_total_price ? ` AND TOTAL_PRICE>=` + req.body.min_total_price : ``} ${req.body.max_total_price ? ` AND TOTAL_PRICE<=` + req.body.max_total_price : ``} AND 1=1 `;
                    // console.log(stmt);
                    // res1 = await conn.query(stmt);
                }
            }
            if (stmt.search(/WHERE\s*AND/) != -1) {
                let idx = stmt.search(/AND/);
                let firstPart = stmt.substring(0, idx);
                let lastPart = stmt.substring(idx + 3);
                stmt = firstPart + lastPart;
            }
            console.log(stmt)
            res1 = await conn.query(stmt)
            if(stmt2) {
                if (stmt2.search(/WHERE\s*AND/) != -1) {
                    let idx = stmt2.search(/AND/);
                    let firstPart = stmt2.substring(0, idx);
                    let lastPart = stmt2.substring(idx + 3);
                    stmt2 = firstPart + lastPart;
                }
                console.log(stmt)
                res2 = await conn.query(stmt2)
            }
            var data = { rent: res1, sale: res2 };
            res.render('search-result.ejs', data);
        }
        catch (err) {
            console.log(err)
        }
    })()
});

module.exports = router