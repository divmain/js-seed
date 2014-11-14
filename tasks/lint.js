var
  path = require("path");

var
  gulp = require("gulp"),
  _ = require("lodash"),
  gutil = require("gulp-util"),
  map = require("map-stream"),
  eslint = require("gulp-eslint");

module.exports = function(config) {
  gulp.task("lint", "Lint application- and test-code.", function (cb) {
    var success = true;

    gulp.src([
      path.join(config.frontendFullPath, "**/*.js"),
      path.join(config.root, "*.js"),
      path.join(config.root, "tasks/**/*.js")
    ])
      .pipe(eslint())
      .pipe(map(function (file, output) {
        success = success && _.every(file.eslint && file.eslint.messages, function (message) {
          return message.severity !== 2;
        });
        return output(null, file);
      }))
      .pipe(eslint.format())
      .on("end", function () {
        if (success) {
          gutil.log("[lint]", "SUCCESS!");
          cb();
        } else {
          cb(new gutil.PluginError("lint", "*** FAILED ESLINT ***"));
        }
      });
  });
};
