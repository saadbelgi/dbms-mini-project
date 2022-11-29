const express = require('express');
var router = express.Router();
var conn = require('../database');

router.post('/', (req, res, next) => {
    console.log(req.body)
    var stmt = `INSERT INTO HOUSE (OWNER_ID,CATEGORY,STATE,CITY,AREA,PINCODE,TYPE,FLOOR,SIZE,NO_OF_ROOMS,FURNISHING_STATUS${req.body.no_of_parking_spaces ? `,NO_OF_PARKING_SPACES` : ``}${req.body.pet_allowance ? `,PET_ALLOWANCE` : ``}${req.body.bought_in ? `,BOUGHT_IN` : ``}${req.body.no_of_bathrooms ? `,NO_OF_BATHROOMS` : ``}${req.body.water_availability ? `,WATER_AVAILABILITY` : ``}) VALUES(${req.session.user_id},${req.body.category},"${req.body.state}","${req.body.city}","${req.body.area}","${req.body.pincode}","${req.body.type}",${req.body.floor},${req.body.size},${req.body.no_of_rooms},"${req.body.furnishing_status}"${req.body.no_of_parking_spaces ? `,`+req.body.no_of_parking_spaces : ``}${req.body.pet_allowance ? `,`+req.body.no_of_parking_spaces : ``}${req.body.bought_in ? `,`+req.body.bought_in : ``}${req.body.no_of_bathrooms ? `,`+req.body.no_of_bathrooms : ``}${req.body.water_availability ? `,`+req.body.water_availability : ``})`
    console.log(stmt);
    (async () => {
        try {
            await conn.query(stmt)
            var temp = await conn.query(`SELECT HOUSE_ID FROM HOUSE WHERE OWNER_ID=${req.session.user_id}`)
            var max = temp[0].HOUSE_ID
            temp.forEach(element => {
                max = element.HOUSE_ID > max ? element.HOUSE_ID : max;
            });            
            if(req.body.category == 1) {
                await conn.query(`INSERT INTO RENT (HOUSE_ID,MONTHLY_RENT) VALUES(${max},1)`)
                res.redirect('/rent-info')
            }
            else {
                await conn.query(`INSERT INTO SALE (HOUSE_ID) VALUES(${max})`)
                res.redirect('/sale-info')
            }
            res.redirect('/')
        }
        catch(err) {
            console.log(err.message)
            res.end()
        }
    })()
});

module.exports = router