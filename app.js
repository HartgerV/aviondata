// =============================================================================
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
// Call the packages we need
var companyRoute = require('./routes/company');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// GLOBAL VARS
var port = process.env.PORT || 80; // Set our port

// PARSING
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // Get an instance of the express Router
app.use('/api', router); // All routes will be prefixed with /api
//MiddleWare
router.use(function (req, res, next) {
    console.log('[API] Something is happening:');
    console.log(req.method + req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Content-Type, token');
    next(); // go to the next routes
});
companyRoute(router); //Add routes from ./routes directory
// APP DIRECTORY
app.use(express.static(__dirname + '/frontend'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('[SERVER] Listening on port ' + port);
