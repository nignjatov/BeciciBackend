module.exports = function (req, res, next) {
  console.log("Validation");
  return next();
}
// var express = require('express');
//
// module.exports = function (permissionType, httpMethod, route, callback) {
//
//   var routeResult = [];
//   // type admin ili user
//   var router = express.Router();
//   //Validation
//
//   //Prepare
//
//   //Route
//   router[httpMethod.toLowerCase()](route, callback);
//
//
//   //return
//
//
//   // return [validation, prepare ,routeRegistered]
// }
