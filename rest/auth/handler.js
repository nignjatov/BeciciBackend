var authModel = require("./models");

module.exports = (function () {
  return {
    signup: function (req, res, next) {
      console.log("GOT EM");
      authModel.register(req.body.username, req.body.password, function(err) {
        if (err) {
          console.log('error while user register!', err);
          return next(err);
        }
      });
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
