var express = require('express');
var config = require("./config");
var path = require('path');
var parser = require('./parser');

var app = express();

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    res.render(("index"), {body: parser});
    //console.log(parser);
});

app.use(function(req, res, error) {
    res.status(404).render(("error"),{body: '<b>Извините. Произошла ошибка.</b>'});
    console.log('Попытка получить доступ к :'+ req.url);
});

app.listen(config.get('port'), function () {
    console.log('Слушает на порту: '+ config.get('port'));
});