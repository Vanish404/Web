var express = require('express');
var parser = require('../parser');

var router = express.Router();
var massJson = "data lost";

parser.getData(function (err, result) {
    if (err) {
        console.log(err.message);
    }
    else {

        massJson = result;
        console.log('Cache is built');
    }
});

setInterval(function() {
    parser.getData(function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else {
            massJson = result;
            console.log('Cache is built');
        }
    })
}, 180000);

router.get('/', function(req, res) {
    res.render(("index"), {body: massJson});
});

module.exports = router;