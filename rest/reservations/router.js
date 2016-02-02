var express = require('express');
var handler = require('./handler.js');
var validation = require('./config/validation.js');
var RouterFactory = require('../../libs/router-factory');

module.exports = (function () {
  // Set path for collecting validation file :)
  var router = RouterFactory(__dirname);

  router.register("getReservations", "GET", "/list/all", [], handler.getReservations);
  router.register("createReservation", "POST", "/", ["user"], handler.createReservation);
  router.register("updateReservationStatus", "PATCH", "/:paymentId/:status", ["admin"], handler.updateReservationStatus);
  router.register("deleteReservation", "DELETE", "/:reservationId", ["admin"], handler.deleteReservation);

  return router.getRoutes();
})();
