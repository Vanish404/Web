var request = require('request');
var http = require('http');
var cheerio = require('cheerio');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'text/plain'
};

var options = {
    url: 'http://gamebomb.ru/news',
    method: 'GET',
    headers: headers
};

var myData = [];
var getData = function (callback) {
    request(options, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            myData = [];
            var $ = cheerio.load(body);
            $('.sub:not(.gray)').each(function () {
                var link = $(this);
                var text = link.next().text();
                var href = $(this).next().attr('href');

                myData.push({
                    link: href,
                    title: text
                });
            });
            callback(null, myData);
        }
    });
};
var pageData = [];
getData(function (err, rez) {
    getUrl();
});
function getUrl() {
    if (myData.length === 0) {
        return;
    }
    console.log(myData.length);
    var next = myData.shift().link;
    makeRequest(next, getUrl);
}
function makeRequest(url, callback) {
    request(url, function (err, response, body) {
        console.log(url);
        var $ = cheerio.load(body);
        $('.container-margin p').each(function () {

            var link = $(this);
            var text = link.text().replace(/^\s+|\s+$/g, '');

            if (text !== '') {
                console.log(text);

                pageData.push({
                    text: text
                });

            }

        });
        callback();
    });
}
/*var pageData = [];
getData(function (err, rez) {
    var url = [];
    for (url in rez) {
        /!*if (err) {
            console.log(err.stack);
        }
        console.log(rez);*!/

        request(rez[url].link, function (err, response, body) {
            var $ = cheerio.load(body);
            console.log(rez[url].link);
            $('.container-margin p').each(function () {

                var link = $(this);
                var text = link.text().replace(/^\s+|\s+$/g, '');

                if (text !== '') {
                    console.log(text);

                    pageData[url] = text;

                }
            });
        });

    }
});*/
module.exports.getData = getData;
