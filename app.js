var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var favicon = require('serve-favicon');
var app = express();

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');
var myDat = [];
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', routes);

setInterval(function () {
    var fork = require('child_process').fork;
    var cp = fork('./parser');
    cp.on('message', function (msgobj) {
        myDat = msgobj;
        console.log(msgobj);
        /*require('./CreateDB');*/
        getUpdate();
    });
    cp.send({
        text: 'I send msg'
    });
}, 120000);
function getPages (callback) {
    callback(myDat);
}
function getUpdate() {
    require('./CreateDB');
}
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {body: '<b>Извините. Произошла ошибка.</b>',
        error: err.status, message: err.message
    });
});

module.exports = app;
module.exports.getPages = getPages;
