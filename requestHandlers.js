var parser = require('./parser');

var mass = "data lost";

parser.getData(function(err, result){
    if(err) {
        console.log(err.message);
    }
    else {
        mass = result;
    }
});

function loadHomePage(req, res) {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(mass));
    res.end();
}

exports.loadHomePage = loadHomePage;