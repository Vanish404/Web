var request = require('request');
var cheerio = require('cheerio');
process.on('message', function (msgobj) {
    console.log('Child got message:', msgobj.text);
    console.log('Child pid: ' +  process.pid);
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'text/plain'
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
                return callback(error, null);
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
                return callback(null, myData);
            }
        });
    };

    var pageData = [];
    getData(function (err, rez) {
        if (err) {
            console.log(err.message);
            process.exit(0);
            return;
        }
        getUrl();
    });

    function getUrl() {
        if (myData.length === 0) {
            process.send(pageData);
            process.exit(0);
            return;
        }
        console.log('Запрос: ' + myData.length);
        var next = myData.shift();

        makeRequest(next, getUrl);
    }

    function makeRequest(url, callback) {
        request(url.link, function (err, response, body) {
            if (err) {
                callback();
            }
            console.log(url);
            var textString = '';
            var $ = cheerio.load(body);
            $('.container-margin p').each(function () {
                var link = $(this);
                var text = link.text().replace(/^\s+|\s+$/g, '');
                if (text !== '') {
                    console.log(text);
                    textString += text;
                }
            });
            pageData.push({
                link: url.link,
                title: url.title,
                text: textString
            });

            callback();
        });
    }

});

