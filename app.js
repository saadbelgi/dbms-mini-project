// imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session')
const util = require('util')
// creating server
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));


// setting the view engine
app.set('view engine', 'ejs');


// setting up middleware
app.use(express.static(path.resolve('public')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "CibaQoHtaY0H3QOB1kqR8H2A", //this is not supposed be modified ever
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
    // using default genid (and keeping everthing else default)
}));
app.use((req, res, next) => {
    console.log(req.session);
    next();
})

// connecting to database
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Saad2*04',
//     database: 'dbmsproj'
// });
// using async await (making a function that returns promises)
function makeDb(config) {
    const connection = mysql.createConnection(config); 
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}
const conn = makeDb({
    host: 'localhost',
    user: 'root',
    password: 'Saad2*04',
    database: 'dbmsproj'
});
// conn.connect((err) => {
//     if (err)
//         console.log(err);
//     else
//         console.log('Connected to the database successfully!');
// });


// request handling :

app.all('/login', (req, res) => {
    res.sendFile(path.resolve('public', 'login.html'));
})

app.all('/create', (req, res) => {
    res.sendFile(path.resolve('public', 'create_acc.html'));
})

app.all('/user-info', (req, res) => {
    res.sendFile(path.resolve('public', 'more_info.html'));
})

app.all('/homeseeker-info', (req, res) => {
    res.sendFile(path.resolve('public', 'homeseeker_info.html'));
})

app.all('/tenant-info', (req, res) => {
    res.sendFile(path.resolve('public', 'tenant_info.html'));
})

app.all('/buyer-info', (req, res) => {
    res.sendFile(path.resolve('public', 'buyer_info.html'));
})

app.all('/homeowner-info', (req, res) => {
    res.sendFile(path.resolve('public', 'owner_info.html'));
})


app.post('/acct-creation', (req, res) => {
    var date = new Date().toISOString().slice(0, 10);
    var stmt = `INSERT INTO USER (EMAIL, PASSWORD, ACCT_CREATION_DATE, LAST_ACTIVE_DATE) VALUES ("${req.body.email}", "${req.body.password}", "${date}", "${date}")`;
    conn.query(stmt, (err) => {
        if (err) {
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
        else {
            conn.query(`SELECT USER_ID FROM USER WHERE EMAIL="${req.body.email}"`, (err2, result) => {
                if (!err) {
                    // console.log(req.session);
                    req.session.user_id = result[0].USER_ID;
                }
            })
            // send a new page after account creation asking for other details of the user
            // res.sendFile(path.resolve('public', 'more_info.html'));
            res.redirect('/user-info')
        }
    });
});

app.post('/postinfo', (req, res) => {
    var stmt = `UPDATE USER SET F_NAME="${req.body.f_name}", M_NAME="${req.body.m_name}", L_NAME="${req.body.l_name}", DOB="${req.body.dob}", GENDER="${req.body.gender}", STATE="${req.body.state}", CITY="${req.body.city}", AREA="${req.body.area}", PINCODE="${req.body.pincode}", CATEGORY=${req.body.category} WHERE USER_ID=${req.session.user_id};`;
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
            var table = req.body.category == 1 ? 'TENANT' : (req.body.category == 2 ? 'BUYER' : 'HOMEOWNER');
            await conn.query(`INSERT INTO ${table} USER_ID VALUES(${req.session.user_id})`);
            if(req.body.category != 3) {
                await conn.query(`INSERT INTO HOMESEEKER USER_ID VALUES(${req.session.user_id})`);
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

app.post('/post-homeseeker-info', (req, res) => {
    console.log(req.body);
    var stmt = `UPDATE HOMESEEKER SET PREFERRED_CITY=NULLIF("${req.body.preferred_city}",""), PREFERRED_AREA=NULLIF("${req.body.preferred_area}",""), PREFERRED_HOUSE_TYPE=NULLIF("${req.body.preferred_house_type}","") PREFERRED_FLOOR=${req.body.preferred_floor} PREFERRED_SIZE=${req.body.preferred_size} WHERE USER_ID=${req.session.user_id};`;
    console.log(stmt);
    console.log(req.body.preferred_floor);
    res.end();
});

app.post('/post-tenant-info', (req, res) => {
    var stmt = `UPDATE TENANT SET MAX_RENT=${req.body.max_rent}, MAX_NO_OF_ROOMMATES=${req.body.max_no_of_roommates}, MARITAL_STATUS=${req.body.marital_status}, FOOD_HABIT=${req.body.food_habit} WHERE USER_ID=${req.session.user_id};`;
    res.end();
});

app.post('/logged-in', (req, res) => {
    var stmt = `SELECT F_NAME,M_NAME,L_NAME,USER_ID,EMAIL,PASSWORD FROM USER WHERE EMAIL="${req.body.email}"`;
    (async () => {
        try{
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
        catch(err) {
            console.log(err.message);
        }
    })();
});



// handling 404 requests
app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404! Not found</h1>');
});

// exporting everything for bin/www
module.exports = app;