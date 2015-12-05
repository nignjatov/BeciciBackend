
var logger = require('../logger');
var validation = require('../validation');

module.exports = {
  // Route validation + error_handle + format + logger
  in: function (req, res, next) {
    logger.log(req);
    return validation.apply(null, arguments);
  },
  // Error handle + Shoot payload
  out: function (req, res, next) {
    res.json(req.payload);
    // The end;
    return next();
  },
  error: function (err, req, res, next) {
    console.log("ERROR HANDLE");
    res.status(Container.config.errorCodes[err].httpCode).json(Container.config.errorCodes[err]);
  }
}
