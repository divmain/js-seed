var
  path = require("path");

var
  _ = require("lodash"),
  map = require("map-stream"),
  eslint = require("gulp-eslint");


module.exports = function (gulp, config) {
  gulp.task("lint", "Lint application- and test-code.", function () {
    var success = true;

    return gulp.src([
      path.join(config.frontendFullPath, "**/*.js"),
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
      });
  });
};
