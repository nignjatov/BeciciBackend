/**
 * Created by orahkokos on 12/14/15.
 */

var
  LocalStrategy = require('passport-local').Strategy,
  path = require('path'),
  authModel = require('../models'),
  userModel = require(path.join(Container.path.REST_PATH, 'users', 'models'));

module.exports = function (passport) {

  // Local Strategy
  passport.use('local-signup', new LocalStrategy.Strategy(
    { passReqToCallback: true },
    function (req, username, password, done) {
      authModel.findOne({username: username}, function (err, found) {
        if (err) return done("MONGO_ERROR");
        if (found) return done("AUTH_USERNAME_TAKEN");

        var auth = new authModel({username: username, passport: password});
        var user = new userModel(req.body); // Check
        // Create User

        user.save(function (err) {
          if (err) return done("MONGO_ERROR");
          auth.cryptPassword();
          auth.userId = user._id;
          auth.save(function (err) {
            if (err) return done("MONGO_ERROR");
            return done(null, user.toObject());
          });
        });
      })
    }
  ));

  // Social ...
};
