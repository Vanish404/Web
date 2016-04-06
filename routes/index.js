var express = require('express');
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
