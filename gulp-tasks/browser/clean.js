var
  path = require("path");

var
  gulp = require("gulp"),
  del = require("del");

var
  config = require("../../project.config");

gulp.task("clean", false, function (cb) {
  del([
    path.join(config.dest, "/**/*")
  ], cb);
});
