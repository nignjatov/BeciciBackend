var handler = require('./handler.js');
var RouterFactory = require('../../libs/router-factory');
var AuthModel = require('./models');

module.exports = function (passport) {

  var router = RouterFactory(__dirname);

  router.register("signup", "POST", "/signup", [], handler.signup);
  router.register("login", "POST", "/login", [], [passport.authenticate(), handler.login]);
  router.register("check", "GET", "/check-auth", [], handler.checkAuth);

  return router.getRoutes();

};
