var
  path = require("path");

var
  gulp = require("gulp"),
  del = require("del");

module.exports = function(config) {
  gulp.task("frontend-clean", false, function (cb) {
    del([
      path.join(config.dest, "**")
    ], cb);
  });
};
