module.exports = exports = function lastModifiedPlugin (schema) {
  schema.add({ last_modified: Date })

  schema.pre('save', function (next) {
    console.log("SAVING "+ new Date());
    this.last_modified = new Date();
    next();
  })

}