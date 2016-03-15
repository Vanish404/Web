var request = require("request");
var http = require('http');
var cheerio = require("cheerio");

var url = "http://gamebomb.ru";
var pool = new http.Agent({keepAlive:true});

var getData = function(callback) {
    var myData = [];
    request({url: url, agent: pool}, function (error, response, body) {
        if (error) {
            callback(error, null);
        }
        else {
            var $ = cheerio.load(body);
            $(".sub:not(.gray)").each(function () {
                var link = $(this);
                var text = link.next().text();
                var href = $(this).next().attr("href");

                myData.push({
                    link: href,
                    title: text
                });
            });
            callback(null, myData);
        }
    });
};

module.exports.getData = getData;












