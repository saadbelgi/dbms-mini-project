// imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const mysql = require('mysql');
const session = require('express-session');
const conn = require('./database');
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

// routes
var index = require('./routes/index')
var login = require('./routes/login')
var create = require('./routes/create')
var user_info = require('./routes/user-info')
var homeseeker_info = require('./routes/homeseeker-info')
var tenant_info = require('./routes/tenant-info')
var buyer_info = require('./routes/buyer-info')
var homeowner_info = require('./routes/homeowner-info')
var house_info = require('./routes/house-info')
var rent_info = require('./routes/rent-info')
var sale_info = require('./routes/sale-info')
var logged_in = require('./routes/logged-in')
var acct_creation = require('./routes/acct-creation')
var post_info = require('./routes/postinfo')
var post_homeseeker_info = require('./routes/post-homeseeker-info')
var post_tenant_info = require('./routes/post-tenant-info')
var post_buyer_info = require('./routes/post-buyer-info')
var post_homeowner_info = require('./routes/post-homeowner-info')
var post_house_info = require('./routes/post-house-info')
var post_rent_info = require('./routes/post-rent-info')
var post_sale_info = require('./routes/post-sale-info')
var delete_house = require('./routes/delete-house')
var update_house_info = require('./routes/update-house-info')
var actual_updation_of_house_info = require('./routes/actual-updation-of-house-info')
var search = require('./routes/search')
var post_search = require('./routes/post-search')

// routing middleware
app.use('/', index)
app.use('/create', create)
app.use('/login', login)
app.use('/user-info', user_info)
app.use('/homeseeker-info', homeseeker_info)
app.use('/buyer-info', buyer_info)
app.use('/tenant-info', tenant_info)
app.use('/homeowner-info', homeowner_info)
app.use('/house-info', house_info)
app.use('/rent-info', rent_info)
app.use('/sale-info', sale_info)
app.use('/logged-in', logged_in)
app.use('/acct-creation', acct_creation)
app.use('/postinfo', post_info)
app.use('/post-homeseeker-info',post_homeseeker_info)
app.use('/post-tenant-info', post_tenant_info)
app.use('/post-buyer-info', post_buyer_info)
app.use('/post-homeowner-info',post_homeowner_info)
app.use('/post-house-info',post_house_info)
app.use('/post-rent-info',post_rent_info)
app.use('/post-sale-info',post_sale_info)
app.use('/delete-house', delete_house)
app.use('/update-house-info',update_house_info)
app.use('/actual-updation-of-house-info',actual_updation_of_house_info)
app.use('/search', search)
app.use('/post-search', post_search)

// handling 404 requests
app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404! Not found</h1>');
});

// exporting everything for bin/www
module.exports = app;