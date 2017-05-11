var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require("body-parser");
var Twitter = require('twitter');
var fs = require('fs');
var morgan       = require('morgan');

//Required for MongoDB
var mongoose = require('mongoose');
var configDB = require('./config/database.js'); //External config for db


mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); // connect to mongodb database

app.use(bodyParser.urlencoded({
    extended: true
}));

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/views')); //serve our views here (html and all related client side files)
// app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console

//Routes (where we handle all post and get requests)
require('./app/routes')(app, express);


server.listen(80, function () {
    console.log("Started");
});