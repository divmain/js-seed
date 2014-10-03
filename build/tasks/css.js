"use strict";

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var prefix = require("gulp-autoprefixer");
var path = require("path");
var config = require("../../project.config");
var handleError = require("../util/handle-errors");

gulp.task("build:css", "Build CSS.", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*"))
    .pipe(stylus({
      set: ["compress"],
      define: { "ie8": true }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});
