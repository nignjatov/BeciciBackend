var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = {
  app: {
    port: 3000,
    auth: false,
    validation: false
  },
  mongodb: {
    host: "mongodb://localhost",
    port: ":27017",
    db: "/becici"
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: "smtp.gmail.com",
    ssl: true
  },
  logger: {
    loggerPath: {
      error: path.join(__dirname, 'logs', 'error.log'),
      info: path.join(__dirname, 'logs', 'info.log')
    }
  },
  languages: [
    "en", "rs"
  ],
  errorCodes: {},
  validation: {}
};
