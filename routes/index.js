var express = require('express');
var path = require('path');
var parser = require('../parser');
/*var cp = require('child_process');
var worker = cp.fork('parser.js');*/
var router = express.Router();
var massJson = [];
/*/!*worker.on('message', function(msg) {
 console.log(msg);*!/
 });*/
// убрать состояние
/*parser.getData(function (err, result) {
    if (err) {
        console.log(err.stack);
    } else {
        massJson = result;
        console.log('Cache is built');
        console.log(process.memoryUsage());
    }
});

setInterval(function () {
    parser.getData(function (err, result) {
        if (err) {
            console.log(err.message);
        } else {
            massJson = result;
            console.log('Cache is built');
            console.log(process.memoryUsage());
        }
    });
}, 180000);*/

router.get('/', function (req, res) {
    parser.getData(function (err, result) {
        if (err) {
            err.status = 404;
            res.render('error', {body: '<b>Извините. При получении данных произошла ошибка.</b>',
                error: err.status, message: err.message});
        } else {
            res.render('index', {body: result});
        }
        res.end();
        console.log(req.method);
        console.log(req.headers);
    });
    /*res.render('index', {body: massJson});*/
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
