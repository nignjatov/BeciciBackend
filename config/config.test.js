var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = {
    app: {
        port: 3000
    },
    mongodb: {
        host: "mongodb://localhost",
        port: ":27017",
        db: "/test_becici"
    },
    logger: {
        loggerPath: {
            error: path.join(__dirname, 'logs', 'error.log'),
            info: path.join(__dirname, 'logs', 'info.log'),
        }
    },
    languages: [
        "en","rs"
    ],
    errorCodes: {},
    validation: {}
};
