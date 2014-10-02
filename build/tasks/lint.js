"use strict";

var gulp = require("gulp");
var config = require("../../project.config");
var _ = require("lodash");
var map = require("map-stream");
var eslint = require("gulp-eslint");
var path = require("path");
var handleError = require("../util/handle-errors");

gulp.task("lint", "Lint application- and test-code.", function () {
  var success = true;

  return gulp.src([
    path.join(config.srcFullPath, "**/*.js"),
    path.join(config.root, config.spec, "**/*.js"),
    path.join(config.root, "*.js")
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
      if (!success) {
        throw new Error("*** FAILED ESLINT ***");
      }
    })
    .on("error", handleError);
});
