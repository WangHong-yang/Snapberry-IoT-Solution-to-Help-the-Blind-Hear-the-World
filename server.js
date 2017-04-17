// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');             // file system
var RaspiCam = require("raspicam");
var EventEmitter = require('events').EventEmitter;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/me', function (req, res) {
    res.json({ message: "hubertwang@cmu.edu" });
});
router.get('/photo', function (req, res) {

    var camera = new RaspiCam({
        mode: "photo",
        output: "./photo/image" + req.query.timeStamp + ".png",
        encoding: "png",
        timeout: 0 // take the picture immediately
    });

    camera.on("start", function (err, timestamp) {
        console.log("photo started at " + timestamp);
    });

    camera.on("read", function (err, timestamp, filename) {
        console.log("photo image captured with filename: " + filename);

        // leave 1s for photo to save
        setTimeout(() => {
            camera.stop();
        }, 1000);
    });

    camera.on("exit", function (timestamp) {
        console.log("photo child process has exited at " + timestamp);

        // read file and send back to front-end
        var img = fs.readFileSync('./photo/image' + req.query.timeStamp + '.png');
        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    });

    camera.start();
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);









