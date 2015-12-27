var albums = require("./models");

module.exports = (function () {
  return {
    getAlbums: function (req, res, next) {
      return albums.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        res.json(list);
        return next(null, list);
      });
    },
    getAlbumById: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.find({_id: albumId}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        res.json(list);
        return next(null, list);
      });
    },
    createAlbum: function (req, res, next) {
      var album = new albums(req.body);
      return album.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json(album);
        return next();
      });
    },
    deleteAlbum: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findOneAndRemove({_id: albumId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: albumId});
        return next();
      });
    },
    renameAlbum: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findOneAndUpdate({_id: albumId}, {name: req.body.name}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: albumId});
        return next();
      });
    },
    addImage: function (req, res, next) {
      var albumId = req.params.albumId;
      albums.findById(albumId, function (err, album) {
        if (err) return next("MONGO_ERROR", err);

        album.images.push(req.file.filename);
        album.save(function (err) {
          if (err) return next("MONGO_ERROR", err);
        });
      });
      res.json({id: albumId, filename: req.file.filename});
      return next();
    },
    deleteImage: function (req, res, next) {
      var albumId = req.params.albumId;
      return albums.findByIdAndUpdate(albumId,
        {$pull: {"images": req.params.image}},
        function (err) {
          if (err) return next("MONGO_ERROR", err);
          res.json({id: albumId})
          return next();
        });
    }
  }
})();
