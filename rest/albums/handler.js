var albums = require("./models");

module.exports = (function () {
  return {
    getAlbums: function (req, res, next) {
      return albums.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        return next(null, list);
      });
    },
    createAlbum: function (req, res, next) {
      var album = new albums(req.body);
      return album.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    deleteAlbum: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findOneAndRemove({_id: albumId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    renameAlbum: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findOneAndModify({_id: albumId}, {name: req.body.name}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    addImage: function (req, res, next) {
      var albumId = req.params.albumId;
      console.log(req.body.image);
      console.log(albumId);
      return next();
      //return albums.findByIdAndUpdate(albumId,
      //  {$push: {"images": {img : "testImage"}}},
      //  {safe: true, upsert: true},
      //  function(err) {
      //    console.log(err);
      //    if (err) return next("MONGO_ERROR", err);
      //    return next();
      //  });
    },
    deleteImage: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findByIdAndUpdate(albumId,
        {$pull: {"images": req.params.image}},
        function(err) {
          if (err) return next("MONGO_ERROR", err);
          return next();
        });
    }
  }
})();
