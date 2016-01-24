var contacts = require("./models");
var async = require('async');
var path = require('path');
var email = require(path.join(Container.path.LIBS_PATH, 'email'));

module.exports = (function () {
  return {
    getContactInfo: function (req, res, next) {
      return contacts.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    message: function (req, res, next) {
      return contacts.findOne({}, function (err, contact) {
        if (err) return next("MONGO_ERROR", err);
        async.each(contact.email, function (email, callback) {
          return Container.email.send('contact',
              {
                replyTo: req.body.replyTo,
                name: req.body.name,
                subject: req.body.subject,
                message: req.body.message
              },
                email,
                callback);
          }, function (err) {
            if (err) return next("EMAIL_ERROR");
            res.sendStatus(200);
            return next();
          });
      });
    },
    updateContactInfo: function (req, res, next) {
      var contactId = req.params.contactId;
      delete req.body._id;
      return contacts.findOneAndUpdate({_id: contactId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json(req.body);
        return next();
      });
    },
    createContactInfo: function (req, res, next) {
      var contact = new contacts(req.body);
      return contact.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json(contact);
        return next();
      });
    }
  }
})();
