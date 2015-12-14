var handler = require('./handler.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = function (passport) {

  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("signup", "POST", "/signup", [], [passport.authenticate('local-signup'), handler.signup]);
  router.register("login", "POST", "/login", [], [passport.authenticate('local-login'), handler.login]);
  router.register("check", "GET", "/check-auth", [], handler.checkAuth);


  return router.getRoutes();

};
