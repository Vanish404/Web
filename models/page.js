var mongoose = require('../lib/mongoose');
var   schema = mongoose.Schema({
        link: {
            type: String,
            unique: true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    });

exports.Page = mongoose.model('Page', schema);
