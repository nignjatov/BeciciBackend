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
    db: "/test_becici"
  },
  email: {
    fromAddress: "example@becici.com"
  },
  logger: {
    loggerPath: {
      error: path.join(__dirname, 'logs', 'error.log'),
      info: path.join(__dirname, 'logs', 'info.log'),
    }
  },
  languages: [
    "en", "rs"
  ],
  errorCodes: {},
  validation: {},
  fees: {
    enabled: true,
    dateType: 'days',
    amounts: {
      '45': 0.05,
      '30': 0.1,
      '20': 0.2,
      '15': 0.4,
      '10': 0.8,
      '6': 0.9,
      '0': 1
    },
    days : [6,10,15,20,40,45,10000]
  }
};
