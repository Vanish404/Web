var request = require("request");
var cheerio = require("cheerio");

var myData = [];
var url = "http://gamebomb.ru";

request(url, function (error, response, body) {
    var $ = cheerio.load(body);
    if (!error) {
        $(".sub:not(.gray)").each(function () {
            var link = $(this);
            var text = link.next().text();
            var href = $(this).next().attr("href");

            myData.push({
                link: href,
                title: text
            });
        });
    }
});

module.exports = myData;







