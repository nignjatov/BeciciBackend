var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    title: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    email: [
        {
            type: String,
            pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        }
    ],
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    website: {
        type: String
    }
});

module.exports = ContactSchema;
