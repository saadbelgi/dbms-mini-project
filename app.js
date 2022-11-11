const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    // fs.writeFile('C:\\Users\\arifa\\Desktop\\demReqObj.txt', request.readable,'utf8', (err) => {
    //     if(err) console.log(err);
    // });
    console.log(request);
    response.write('Hello ji!');
    response.end();
})
server.listen(5000);


// const express = require('express');
// const createError = require("http-errors");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");


// const app = express();
// app.listen(3000, () => console.log("Listening at 3000"));
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static('public'));
// app.use("/", indexRouter);
// app.use("/users", usersRouter);


// app.post('/api', function (request, response) {
//     console.log(request);
// });


// module.exports = app;