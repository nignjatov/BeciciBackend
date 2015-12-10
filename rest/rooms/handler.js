var rooms = require("./models");

module.exports = (function () {
  return {
    getRooms: function (req, res, next) {
      return rooms.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        return next(null, list);
      });
    },
    updateRoom: function (req, res, next) {
      var roomId = req.params.roomId;
      return rooms.findOneAndModify({_id: roomId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    deleteRoom: function (req, res, next) {
      var roomId = req.params.roomId;
      return rooms.findOneAndRemove({_id: roomId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    createRoom: function (req, res, next) {
      var room = new rooms(req.body);
      return room.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    }
  }
})();
