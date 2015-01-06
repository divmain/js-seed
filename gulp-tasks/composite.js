var
  path = require("path");

var
  gulp = require("gulp");

var
  config = require("../project.config");

gulp.task("default", false, function () {
  gulp.tasks.help.fn();
});

gulp.task("build", "Copy assets, build CSS and JS.", ["clean"], function () {
  gulp.run("copy");
  gulp.run("build:css");
  gulp.run("build:js");
});

gulp.task("build-dev", "Build, but with unminified JS + sourcemaps.", ["clean"],
  function () {
    gulp.run("copy");
    gulp.run("build:css");
    gulp.run("build:js-dev");
  }
);

gulp.task("watch", "Perform build-dev when sources change.", ["build-dev"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), ["build-dev"]);
});
