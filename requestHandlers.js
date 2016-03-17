var parser = require('./parser');

var massJson = "data lost";

parser.getData(function (err, result) {
    if (err) {
        console.log(err.message);
    }
    else {
        massJson = result;
        console.log('Cache is built');
    }
});

setInterval(function() {
   parser.getData(function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else {
            massJson = result;
            console.log('Cache is built');
        }
    })
}, 180000);

function loadHomePage(req, res) {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(massJson));
    res.end();
}

exports.loadHomePage = loadHomePage;