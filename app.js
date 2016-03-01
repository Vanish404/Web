var http = require('http');
var express = require('express');
//var util = require('util');
var config = require('./config');
var log = require('./libs/log')(module);
var app = express();//функция для обработки запроса

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render("index", {
        body: '<b>Привет</b>'
    });
});


app.use(function(err, req, res, next) {
    // NODE_ENV = 'production'
    if (app.get('env') == 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});

http.createServer(app).listen(config.get('port'), function(){
    log.info('Сервер слушает на порте: ' + config.get('port'));
});