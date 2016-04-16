var express = require('express');
var path = require('path');
var parser = require('../parser');
var router = express.Router();

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
});

module.exports = router;
