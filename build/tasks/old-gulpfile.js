var _frontendTest,
  path = require("path"),
  _ = require("lodash"),
  map = require("map-stream"),

  // Gulp
  gulp = require("gulp"),
  gulpHelp = require("gulp-help"),
  clean = require("gulp-clean"),
  openUrl = require("open"),
  webserver = require("gulp-webserver"),

  // Application config
  config = require("./project.config"),

// Change `gulp.task` signature to require task descriptions.
gulpHelp(gulp);


/**
 * Composite Tasks
 */

gulp.task("build", "Copy assets, build CSS and JS.", ["lint", "test-phantom"], function () {
  gulp.run("clean");
  gulp.run("copy");
  gulp.run("build:css");
  gulp.run("build:js");
});

gulp.task("build-dev", "Build, but with unminified JS + sourcemaps.", ["clean"], function () {
  gulp.run("copy");
  gulp.run("build:css");
  gulp.run("build:js-dev");
});

gulp.task("watch", "Perform build-dev when sources change.", ["build-dev"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), ["build-dev"]);
});


/**
 * Component Tasks
 */

gulp.task("clean", false, function () {
  return gulp.src(path.join(config.dest, "*"))
    .pipe(clean());
});

gulp.task("copy", false, function () {
  return gulp.src(
    path.join(config.srcFullPath, config.assets, "**/*"),
    { base: path.join(config.srcFullPath, config.assets) }
  ).pipe(gulp.dest(config.destFullPath));
});

gulp.task("reload:server", false, function () {
  gulp.src(config.destFullPath)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port: config.port,
      open: "/",
      https: false
    }));
});
