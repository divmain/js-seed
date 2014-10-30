var
  path = require("path");

var
  gulp = require("gulp"),
  gulpHelp = require("gulp-help");

var
  config = require("./project.config"),
  webpackConfig = require("./webpack.config"),
  karmaConfig = require("./karma.config");


gulpHelp(gulp); // Update `gulp.task` signature to take task descriptions.


/**
 * Composite Tasks
 */

gulp.task("default", false, function () {
  gulp.tasks.help.fn();
});

gulp.task("build", "Copy assets, build CSS and JS.", ["lint", "test-phantom"], function () {
  gulp.run("frontend-clean");
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


/**
 * Component Tasks
 */

require("./tasks/lint")(gulp, config);
require("./tasks/frontend/clean")(gulp, config);
require("./tasks/frontend/copy")(gulp, config);
require("./tasks/frontend/build-css")(gulp, config);
require("./tasks/frontend/build-js")(gulp, webpackConfig);
require("./tasks/frontend/build-js-dev")(gulp, webpackConfig);
require("./tasks/frontend/test-browser")(gulp, config, webpackConfig);
require("./tasks/frontend/test-karma")(gulp, config, karmaConfig);
