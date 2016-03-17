var app = require('./app');
var config = require("./config");

app.listen(config.get('port'), function () {
    console.log('Слушает на порту: '+ config.get('port'));
});