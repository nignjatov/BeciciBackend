var users = require("./models");

module.exports = (function () {
  return {
    signup: function (req, res, next) {
      console.log("GOT EM");
    },
    login: function (req, res, next) {
      console.log("GOT EM");
    },
    checkAuth: function (req, res, next) {
      console.log("GOT EM");
      req.payload = true;
      return next();
    }
  }
})();
