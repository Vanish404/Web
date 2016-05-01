var express = require('express');
var Page = require('../models/page');
var router = express.Router();

router.get('/news', function (req, res, next) {
    Page.find({}, function (err, pages) {
        if (err) {
            return next(err);
        }
        res.render('index', {content: pages});
        console.log(pages);
    });
});
router.get('/about', function (req, res, next) {

    res.render('about', {title: 'About', content: 'Для реализации запроса и скачивания страниц с другого ресурса, ' +
    'используем модули cheerio и request, и обернем все этот в дочерний процесс (child_process). ' +
    'Каждые пару минут, с помощью функции setInterval, респавнит дочерний процесса.'});

});
router.get('/contact', function (req, res, next) {

    res.render('contact', {title: 'Contact', content: 'Шуба Максим. shubamaxim95@gmail.com'});

});
router.get('/news/:id', function (req, res, next) { // {} -пустые объекты условий
    Page.findById(req.params.id, function (err, page) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        console.log(page._id);
        res.render('content', {title: page.title, content: page.text});
    });

});
module.exports = router;
