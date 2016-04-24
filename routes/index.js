var express = require('express');
var router = express.Router();
var Page = require('../models/page').Page;

/*router.get('/', function (req, res) {
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
});*/
router.get('/news', function(req, res, next) {
    Page.find({}, function(err, pages) {
        if (err) return next(err);
        res.render('index', {content: pages});
        console.log(pages);
    })
});
router.get('/news/:id', function (req, res, next) { // {} -пустые объекты условий
    Page.findById(req.params.id, function (err, page) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        console.log(page._id);        /* res.render('content', {title: page._id, content: page.text});*/
        res.render('content', {title: page.title, content: page.text});
    });

});
module.exports = router;
