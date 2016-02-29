var request = require("request");
var cheerio = require("cheerio");


request({
    uri: "http://gamebomb.ru",
}, function(error, response, body) {
    var $ = cheerio.load(body);
    if(!error) {
        $(" .sub:not(.gray) ").each(function () {//mpvv_vname, newstab_capture
            var link = $(this);
            var text = link.next().text();
            var href = $(this).next().attr("href");

            console.log(text + " -> " + href);


        });
    }
});