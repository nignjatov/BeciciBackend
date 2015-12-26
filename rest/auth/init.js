/**
 * Created by orahkokos on 12/14/15.
 */
var
  router,
  Auth = require('./models'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, callback) {

  passport.use(new LocalStrategy(Auth.authenticate()));
  passport.serializeUser(Auth.serializeUser());
  passport.deserializeUser(Auth.deserializeUser());

  router = require('./router')(passport);

  return callback(null, router);
};