var mongoose = require('./lib/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createPages
], function (err) {
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback) {
    console.log('ПОДКЛЮЧЕНИЕ К БД --------------------------------------------------------');
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/page');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createPages(callback) {
    require('./app').getPages(function (rez) {
        console.log('СОЗДАНИЕ И ЗАПИСЬ В БД --------------------------------------------------------');
        var pages = rez;
        async.each(pages, function (pageData, callback) {
            var page = new mongoose.models.Page(pageData);
            page.save(callback);
        }, callback);
    });

}
