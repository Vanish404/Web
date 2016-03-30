var app = require('./app');
var http = require('http');
var config = require('./config');

var server = http.createServer(app);

server.listen(config.get('port'));

