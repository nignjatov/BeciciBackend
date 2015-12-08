var blogs = require("./models");

module.exports = (function () {
  return {
    getBlogs: function (req, res, next) {
      return blogs.find({}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        return next(null, list);
      });
    },
    createBlog: function (req, res, next) {
      var blog = new blog(req.body);
      return blog.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        return next();
      });
    },
    deleteBlog: function (req, res, next) {
      var blogId = req.params.blogId;
      return blogs.findOneAndRemove({_id: blogId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    },
    updateBlog: function (req, res, next) {
      var blogId = req.params.blogId;
      return blogs.findOneAndModify({_id: blogId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        return next();
      });
    }
  }
})();
