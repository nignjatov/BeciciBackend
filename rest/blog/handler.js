var blogs = require("./models");

module.exports = (function () {
  return {
    getBlogs: function (req, res, next) {
      var type = req.params.type;
      return blogs.find({blogType: type}, function (err, list) {
        if (err) return next("MONGO_ERROR", err);
        if (!list) return next("NOT_FOUND");
        res.json(list);
        return next(null, list);
      });
    },
    createBlog: function (req, res, next) {
      var blog = new blogs(req.body);
      return blog.save(function (err) {
        if (err) return next("MONGO_ERORR", err);
        res.json(blog);
        return next();
      });
    },
    deleteBlog: function (req, res, next) {
      var blogId = req.params.blogId;
      return blogs.findOneAndRemove({_id: blogId}, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: blogId});
        return next();
      });
    },
    updateBlog: function (req, res, next) {
      var blogId = req.params.blogId;
      delete req.body._id;
      return blogs.findOneAndUpdate({_id: blogId}, req.body, function (err) {
        if (err) return next("MONGO_ERROR", err);
        res.json({_id: blogId});
        return next();
      });
    },
    addBlogImage: function (req, res, next) {
      var blogId = req.params.blogId;
      var update = {multimedia: req.file.filename};
      return blogs.findOneAndUpdate({_id : blogId}, update,
        function (err) {
          if (err) return next("MONGO_ERROR", err);
          res.json({_id: blogId,
                    filename : req.file.filename});
          return next();
        });
    }
  }
})();
