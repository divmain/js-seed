var
  path = require("path");

module.exports = function (gulp, config) {
  gulp.task("copy", false, function () {
    return gulp.src(
      path.join(config.frontendFullPath, config.assets, "**/*"),
      { base: path.join(config.frontendFullPath, config.assets) }
    ).pipe(gulp.dest(config.destFullPath));
  });
};
