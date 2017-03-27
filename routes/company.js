module.exports = function (router) {
    const request = require('request');
    router.route('/company/:query')
        .get(function (req,res) {
            var isCompanyIdRegex = /\d{7}[-]\d{1}/;
            if(isCompanyIdRegex.exec(req.params.query)) {
                request('http://avoindata.prh.fi/bis/v1/'+req.params.query, function (error, response, body) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    res.status(response.statusCode).send(body);
                });
            }
            else {
                request('http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&name=' + req.params.query, function (error, response, body) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    res.status(response.statusCode).send(body);
                });
            }
        });
};