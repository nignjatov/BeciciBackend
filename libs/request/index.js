
var logger = require('../logger');

module.exports = {
  in: function httpIn (req, res, next) {
    Container.Logger.log(req);
    return next();
  },
  out: function httpOut (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.json(req.payload);
    return next();
  },
  error: function httpErrorHandle (err, req, res, next) {
    console.log("HTTP ERROR "+err);
    res.status(Container.config.errorCodes[err].httpCode).json(Container.config.errorCodes[err]);
    return next();
  }
};
