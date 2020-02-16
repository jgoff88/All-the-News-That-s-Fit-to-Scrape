//Require dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");



// Setup port to be host designated or 3000.
var PORT = process.env.PORT || 3000;
//Instantiate express app
var app = express();
//Set up express router
var router = express.Router();
require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to express app
app.engine('handlebars', expressHandlebars({
    defaulLayout: "main"
}));
app.set('view engine', 'handlebars');

//Use bodyparser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

//Connect to deployed database or local mongoHeadLines database.
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Moongoose connection is successful");
    }
});


app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});