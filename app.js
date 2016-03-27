var express = require('express');
var routes = require('./routes/index');

var app = express();

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use('/', routes);

app.use(function(req, res, error) {
    res.status(404).render("error",{body: '<b>Извините. Произошла ошибка.</b>'});
    console.log('Попытка получить доступ к :'+ req.url);
});

module.exports = app;