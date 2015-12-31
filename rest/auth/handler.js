var
  authModel = require("./models"),
  ObjectId = require('mongoose').Types.ObjectId,
  path = require('path'),
  crypto = require('crypto'),
  redis = require('redis');

var client = redis.createClient();

module.exports = (function () {
  return {
    prepareUser: function (req, res, next) {
      Container.models.users.count({}, function (err, count) {
        if (err) return next("MONGO_ERROR");

        var user = new Container.models.users({
          _id: ObjectId(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        });

        return user.validate(function (err) {
          if (err) return next("USER_VALIDATION_ERROR");
          req.user = user;
          return next();
        });
      });
    },
    signup: function (req, res, next) {
      var auth = new authModel({username: req.body.username, userId: req.user._id});

      return auth.validate(function (err) {
        if (err) return next("AUTH_VALIDATION_ERROR");

        return req.user.save(function (err) {
          if (err) return next("MONGO_ERROR");

          return authModel.register(auth, req.body.password, function(err) {
            if (err) return next("AUTH_ERROR");
            var hash = crypto.randomBytes(32).toString('hex');
            return Container.email.send('signup',
              {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                hashAddress: "http://localhost:3000/activate/" + hash
              },
                req.user.email,
                function (err) {
                  client.set(hash, req.user._id);
                  client.expire(hash, 60 * 60 * 24);
                  if (err) return next("EMAIL_ERROR");
                  return res.sendStatus(200);
              });
          });
        });
      });
    },
    activate: function (req, res, next) {
      return client.get(req.params.hash, function (err, id) {
        if (err) return next("REDIS_ERROR");
        if (!id) return res.send(404);
        authModel.findOneAndUpdate(id, {active: Date.now()}, function (err) {
          if (err) return next("MONGO_ERROR");
          client.del(req.params.hash);
          return res.sendStatus(200);
        })
      })
    },
    login: function (req, res, next) {
      authModel.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next("AUTH_LOGIN_ERROR");
        return req.login(user, function (err) {
          return res.sendStatus(200);
        });
      });
    },
    checkAuth: function (req, res, next) {
      if (!req.user) return res.sendStatus(403);
      return res.sendStatus(200);
    }
  }
})();
