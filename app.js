var http = require('http');
var parser = require('./parser');
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.loadHomePage;
handle['/home'] = requestHandlers.loadHomePage;

server.start(router.route, handle);