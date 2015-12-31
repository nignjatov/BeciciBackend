var handler = require('./handler.js');
var RouterFactory = require('../../libs/router-factory');
var AuthModel = require('./models');

module.exports = function (passport) {

  var router = RouterFactory(__dirname);

  router.register("signup", "POST", "/signup", [], [handler.prepareUser, handler.signup]);
  router.register("signup", "GET", "/activate/:hash", [], handler.activate);
  router.register("login", "POST", "/login", [], handler.login);
  router.register("check", "GET", "/check-auth", [], handler.checkAuth);

  return router.getRoutes();

};
