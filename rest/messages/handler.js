var messages = require("./models");

module.exports = (function () {
  return {
    getMessages: function (req, res, next) {
      return messages.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    updateMesageStatus: function (req, res, next) {
      var revId = req.params.reviewId;
      var status = req.params.status;
      return messages.findOneAndModify({_id: revId}, {status: status}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    deleteMessage: function (req, res, next) {
      var messageId = req.params.messageId;
      return messages.findOneAndRemove({_id: messageId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createMessage: function (req, res, next) {
      var message = new messages(req.body);
      return message.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    }
  }
})();
