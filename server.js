var http = require("http");
var config = require('./config');

function start(route, handle) {
    function onRequest(req, res) {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        route(handle, req, res);
    }
    http.createServer(onRequest).listen(config.get('port'));
    console.log("Server has started.");
}

exports.start = start;