var
  path = require("path");

var
  gulp = require("gulp"),
  stylus = require("gulp-stylus"),
  prefix = require("gulp-autoprefixer");

module.exports = function(config) {
  gulp.task("build:css", "Build CSS.", function () {
    return gulp.src(path.join(config.frontendFullPath, config.styles, "*"))
      .pipe(stylus({
        set: ["compress"],
        define: { "ie8": true }
      }))
      .pipe(prefix("last 1 version", "> 1%", "ie 8"))
      .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
  });
};
