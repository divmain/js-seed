var
  path = require("path");

var
  gulp = require("gulp");

module.exports = function(config) {
  gulp.task("copy", false, function () {
    return gulp.src(
      path.join(config.frontendFullPath, config.assets, "**/*"),
      { base: path.join(config.frontendFullPath, config.assets) }
    ).pipe(gulp.dest(config.destFullPath));
  });
};
