var
  path = require("path");

var
  del = require("del");

module.exports = function (gulp, config) {
  gulp.task("clean", false, function (cb) {
    del([
      path.join(config.dest, "**")
    ], cb);
  });
};
