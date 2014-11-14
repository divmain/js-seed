var
  path = require("path");

var
  gulp = require("gulp");

module.exports = function(config) {
  gulp.task("default", false, function () {
    gulp.tasks.help.fn();
  });

  gulp.task("build", "Copy assets, build CSS and JS.", ["frontend-clean"], function () {
    gulp.run("copy");
    gulp.run("build:css");
    gulp.run("build:js");
  });

  gulp.task("build-dev", "Build, but with unminified JS + sourcemaps.", ["frontend-clean"],
    function () {
      gulp.run("copy");
      gulp.run("build:css");
      gulp.run("build:js-dev");
    }
  );

  gulp.task("watch", "Perform build-dev when sources change.", ["build-dev"], function () {
    gulp.watch(path.join(config.frontendFullPath, "**/*"), ["build-dev"]);
  });
};
