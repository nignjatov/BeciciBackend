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

    this.email = email.server.connect({
      user:    Container.credentials.EMAIL_HOSTNAME, 
      password:Container.credentials.EMAIL_PASSWORD, 
      host:    Container.credentials.EMAIL_HOST, 
      ssl:     true,
      port:    465
    });

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
      if (type == 'contact') {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          'reply-to': payload.replyTo,
          to: toAddress,
          subject: payload.subject,
          text: msg,
          attachment: [
            { data:msg, alternative:true }
          ]
        };
      } else if (type == 'paymentOk') {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Potvrda plaćanja",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'paymentFail') {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Potvrda plaćanja",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'capture') {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Uspešna rezervacija",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'reject') {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Neuspešna rezervacija",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'cancel'){
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Otkaz rezervacije",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'rejectBank'){
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Storno Autorizacije",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'cancelBank'){
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Storno Transakcije",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else if (type == 'cancelOZone'){
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "Storno Transakcije",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      } else {
        var msg = {
          from: Container.credentials.EMAIL_HOSTNAME,
          to: toAddress,
          subject: "make config",
          text: msg,
          attachment: [
            {data: msg, alternative: true}
          ]
        };
      }
      
      return this.email.send(msg, function (err) {
        console.log(err);
        if (err) return callback('EMAIL_SEND_ERROR');
        return callback(null);
      });
    }.bind(this))
  }
};
