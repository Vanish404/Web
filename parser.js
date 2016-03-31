var request = require('request');
var http = require('http');
var cheerio = require('cheerio');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'text/plain'
};

var options = {
    url: 'http://gamebomb.ru',
    method: 'GET',
    headers: headers
};

var getData = function (callback) {
    request(options, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            var myData = [];
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
/* По всем страницам
var getDataFromPage = function(callback) {
    var nextPage = myData.pop();
    var pageData =[];
    request(nextPage, function(err,response,body) {
        var $ = cheerio.load(body);
        $(".container-margin p").each(function () {

            var link = $(this);
            var text = link.text().replace(/^\s+|\s+$/g, '');

            if(text !== '') {
                pageData.push({
                    text: text
                });
            }

        });
    });
};*/
module.exports.getData = getData;
