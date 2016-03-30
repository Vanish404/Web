var express = require('express');
var parser = require('../parser');

var router = express.Router();
var massJson = [];

parser.getData(function (err, result) {
    if (err) {
        console.log(err.stack);
    } else {
        massJson = result;
        console.log('Cache is built');
    }
});

setInterval(function () {
    parser.getData(function (err, result) {
        if (err) {
            console.log(err.message);
        } else {
            massJson = result;
            console.log('Cache is built');
        }
    });
}, 180000);

router.get('/', function (req, res) {
    res.render('index', {body: massJson});
});
/*
app.use(function(req, res, next) {
    if(massJson.length === 0)
    {
        var err = new Error('No content');
        err.status = 204;
        next(err);
    }

});
*/

module.exports = router;