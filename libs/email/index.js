/**
 * Created by orahkokos on 12/30/15.
 */
var
  config = Container.config.email,
  fs = require('fs'),
  email = require('emailjs'),
  _ = require('lodash'),
  path = require('path');

module.exports = {
  init: function () {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    this.email = email.server.connect(config);

    fs.readdir(path.join(__dirname, 'templates'), function (err, templates) {
      if (err) throw err;
      this.templates = _.map(templates, function (tpl) {
        return tpl.split(".")[0];
      });
    }.bind(this));
  },
  send: function (type, payload, toAddress, callback) {
    if(!_.includes(this.templates, type)) {
      return callback("EMAIL_INVALID_TYPE");
    }
    fs.readFile(path.join(__dirname, 'templates', type + '.html'), function (err, data) {
      var msg = _.template(data);
      msg = msg(payload);
      var msg = {
        from: config.user,
        to: toAddress,
        subject: "Make config for this",
        text: msg,
        attachment: [
          { data:msg, alternative:true }
        ]
      };
      this.email.send(msg, callback);
    }.bind(this))
  }
};
