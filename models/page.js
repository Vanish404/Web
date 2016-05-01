var mongoose = require('../lib/mongoose');
var   schema = mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    }
});
var Page = mongoose.model('Page', schema);
module.exports = Page;
