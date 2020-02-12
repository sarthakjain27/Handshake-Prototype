//inbuilt package imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

//my api package imports
var Database = require('./Database')


// setting view engine
app.set("view engine", "ejs");
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(session({
    secret: 'sarthak_handshake_secure_string',
    resave: false,
    saveUninitialized: true,
}));

var server = app.listen(3001, () => {
    console.log('Server listening on port 3001');
});