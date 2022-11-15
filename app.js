// imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');


// creating server
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));


// setting the view engine
app.set('view engine','ejs');


// setting up middleware
app.use(express.static(path.resolve('public')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended : false }));


// connecting to database
const conn = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'Saad2*04',
   database:'dbmsproj'
});
conn.connect((err) => {
    if(err)
        console.log(err);
    else
        console.log('Connected to the database successfully!');
});


// request handling :

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('public','login.html'));
})

app.get('/create', (req, res) => {
    res.sendFile(path.resolve('public','create_acc.html'));
})

app.post('/acct-creation', (req, res) => {
    var date = new Date().toISOString().slice(0,10);
    var stmt = `INSERT INTO USER (EMAIL, PASSWORD, ACCT_CREATION_DATE, LAST_ACTIVE_DATE) VALUES ("${req.body.email}", "${req.body.password}", "${date}", "${date}")`;
    conn.query(stmt, (err, result) => {
        if(err) {
            console.log(err);
            if(err.message.includes('ER_DUP_ENTRY')) {
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
            // send a new page after account creation asking for other details of the user
            res.sendFile(path.resolve('public','more_info.html'));
        }
    });
});

app.post('/postinfo', (req, res) => {
    var stmt = `UPDATE `
})

app.post('/logged-in', (req, res) => {
    var stmt = `SELECT EMAIL,PASSWORD FROM USER WHERE EMAIL="${req.body.email}"`;
    conn.query(stmt, (err, result) => {
        if(err)
            console.log(err)
        else {
            if(result.length == 0) {
                // make this look better
                res.send(`Your email ID ${req.body.email} is not registered on our website. Please use another email ID to login or create an account with this ID.`);
            }
            else if(result[0].PASSWORD == req.body.password) {
                // change this
                res.render('logged-in.ejs', req.body);
            }
            else {
                // might have to changr this
                res.send('Your password is wrong.')
            }
        }
    });
});

// handling 404 requests
app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404! Not found</h1>');
});

// exporting everything for bin/www
module.exports = app;