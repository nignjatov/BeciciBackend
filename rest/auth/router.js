var handler = require('./handler.js');
var RouterFactory = require('../../libs/router-factory');
var authModel = require('./models');

module.exports = function (passport) {

  //var Account = require('./models/account');
  //passport.use(new LocalStrategy(Account.authenticate()));
  //passport.serializeUser(Account.serializeUser());
  //passport.deserializeUser(Account.deserializeUser());

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("signup", "POST", "/signup", [], [passport.authenticate('local-signup'), handler.signup]);
  router.register("login", "POST", "/login", [], [passport.authenticate('local-login'), handler.login]);
  router.register("check", "GET", "/check-auth", [], handler.checkAuth);


  return router.getRoutes();

};
