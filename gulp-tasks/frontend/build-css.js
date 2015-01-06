var
  path = require("path");

var
  gulp = require("gulp"),
  stylus = require("gulp-stylus"),
  less = require("gulp-less"),
  sass = require("gulp-sass"),
  prefix = require("gulp-autoprefixer");

var
  config = require("../../project.config");

gulp.task("build:css", "Build CSS, Stylus & LESS --> CSS.", [
  "build:css:css",
  "build:css:stylus",
  "build:css:less",
  "build:css:sass"
]);

gulp.task("build:css:css", "Build and add vendor prefixes for plain CSS.", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*.css"))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});

gulp.task("build:css:stylus", "Build and add vendor prefixes to Stylus styles.", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*.styl"))
    .pipe(stylus({
      set: ["compress"],
      define: { "ie8": true }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});

gulp.task("build:css:less", "Build and add vendor prefixes to LESS styles.", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*.less"))
    .pipe(less())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});

gulp.task("build:css:sass", "Build and add vendor prefixes to SAS styles.", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*.scss"))
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});
