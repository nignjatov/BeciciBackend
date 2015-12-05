var
  winston = require('winston'),
  fs = require('fs'),
  chalk = require('chalk');

module.exports = {
  log: function (req) {
    winston.info(chalk.green(req.url, JSON.stringify(req.params, null, 2), JSON.stringify(req.body, null, 2)));
  }
}
