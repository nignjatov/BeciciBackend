var contacts = require("./models");

module.exports = (function () {
  return {
    getContactInfo: function (req, res, next) {
      return contacts.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
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
