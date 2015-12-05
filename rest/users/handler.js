var users = require("./models");

module.exports = (function () {
  return {
      getUser: function (req, res, next) {
        var userId = req.params.userId;
        return users.findOne({_id: userId}, function (err, found) {
          if (err) return next("MONGO_ERROR", err);
          if (!found) return next("NOT_FOUND");
          return next(null, found);
        });
      },
      getUsers: function (req, res, next) {
        return users.find({}, function (err, list) {
          if (err) return next("MONGO_ERROR", err);
          return next(null, list);
        });
      },
      updateUser: function (req, res, next) {
        var userId = req.params.userId;
        return users.findOneAndModify({_id: userId}, req.body, function (err) {
          if (err) return next("MONGO_ERROR", err);
          return next();
        });
      },
      deleteUser: function (req, res, next) {
        var userId = req.params.userId;
        return users.findOneAndRemove({_id: userId}, function (err) {
          if (err) return next("MONGO_ERROR", err);
          return next();
        });
      },
      createUser: function (req, res, next) {
        var user = new users(req.body);
        return user.save(function (err) {
          if (err) return next("MONGO_ERORR", err);
          return next();
        });
      }
  }
})();
