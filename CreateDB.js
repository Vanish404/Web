var mongoose = require('./lib/mongoose');
var async = require('async');

async.series([
    dropDatabase,
    requireModels,
    createPages
], function (err) {
    console.log(arguments);

});

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
