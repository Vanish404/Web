var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', routes);

app.use(function(req, res, error) {
    res.status(404).render("error",{body: '<b>Извините. Произошла ошибка.</b>'});
    console.log('Попытка получить доступ к :'+ req.url);
});

module.exports = app;