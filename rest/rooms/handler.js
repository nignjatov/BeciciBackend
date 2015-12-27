var rooms = require("./models");

module.exports = (function () {
  return {
    getRooms: function (req, res, next) {
      return rooms.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        res.json(list);
        return next(null, list);
      });
    },
    getRoomById: function (req, res, next) {
      var roomId = req.params.roomId;
      return rooms.find({_id: roomId}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        res.json(list);
        return next(null, list);
      });
    },
    updateRoom: function (req, res, next) {
      var roomId = req.params.roomId;
      delete req.body._id;
      return rooms.findOneAndUpdate({_id: roomId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: roomId});
        return next();
      });
    },
    deleteRoom: function (req, res, next) {
      var roomId = req.params.roomId;
      return rooms.findOneAndRemove({_id: roomId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: roomId});
        return next();
      });
    },
    createRoom: function (req, res, next) {
      var room = new rooms(req.body);
      return room.save(function (err) {
        console.log(err);
        if (err) return next("MONGO_ERORR", err);
        res.json(room);
        return next();
      });
    },
    addRoomImage: function (req, res, next) {
      var roomId = req.params.roomId;
      var update    = {image: req.file.filename};
      //TODO remove old image
      return rooms.findOneAndUpdate({_id: roomId}, update,
        function (err) {
          if (err) return next("MONGO_ERROR", err);
          res.json({
            _id: roomId,
            filename: req.file.filename
          });
          return next();
        });
    }
  }
})();
