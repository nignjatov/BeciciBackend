/**
 * Created by orahkokos on 12/14/15.
 */
var RouterFactory = require('../../libs/router-factory');
var express = require('express');


module.exports = (function () {
  //var router = RouterFactory(__dirname);
  //
  //return router.getRoutes();
  return express.Router();
})();

