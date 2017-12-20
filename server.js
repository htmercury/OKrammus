﻿var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    ip = process.env.IP || '0.0.0.0',
    mongoose = require('mongoose'),
    Champions = require('./api/models/OKrammusModel'), //created model loading here
    newrelic = require('newrelic'),
    bodyParser = require('body-parser');


// DATABASE SETUP

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/OKrammusRoutes'); //importing route
routes(app); //register the route


app.listen(port, ip);


console.log('OKrammus RESTful API server started on: ' + port);

module.exports = app;

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});