/**
 * Created by orahkokos on 12/13/15.
 */
var multer = require('multer');
var crypto = require('crypto');
var _ = require('lodash');
var path = require('path');

module.exports = function (multipart) {

  function fileFilter (req, file, cb) {
    var allowed = ['png', 'jpg', 'jpeg','pdf'];
    var check = file.mimetype.split('/')[1];
    if (!_.includes(allowed, check)) {
      return cb("FILE_FORMAT_ERROR")
    }
    return cb(null, true);
  }

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.join(Container.path.STORAGE_PATH, multipart.storage));
    },
    filename: function (req, file, cb) {
      var filename = crypto.randomBytes(32).toString('hex') + '-' + Date.now() + "." + file.mimetype.split('/')[1];
      return cb(null, filename)
    }
  });

  var upload = multer({storage: storage, fileFilter: fileFilter});

  return upload[multipart.type](multipart.name);

};