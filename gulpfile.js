var
  path = require("path");

var
  _ = require("lodash"),

  // Gulp
  gulp = require("gulp"),
  gulpHelp = require("gulp-help"),
  gutil = require("gulp-util"),
  webserver = require("gulp-webserver"),

  // Tests

  // Webpack
  webpack = require("webpack");

  // Application config
var
  config = require("./project.config"),
  webpackConfig = require("./webpack.config");


// Change `gulp.task` signature to require task descriptions.
gulpHelp(gulp);


/**
 * Composite Tasks
 */

gulp.task("default", false, ["help"], function () {});

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
  gulp.watch(path.join(config.frontendFullPath, "**/*"), ["build-dev"]);
});


/**
 * Component Tasks
 */

require("./tasks/clean");
require("./tasks/frontend-copy");
require("./tasks/lint")(gulp, config);

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


/**
 * Stylus / CSS
 */

require("./tasks/frontend-build-css")(gulp, config);


/**
 * JS
 */

require("./tasks/frontend-build-js")(gulp, config);

gulp.task("build:js-dev", "Build unminified JS with sourcemaps.", function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);
  webpackConf.devtool = "sourcemap";
  webpackConf.debug = true;

  webpack(webpackConf, function (err, stats) {
    if (err) {
      throw new gutil.PluginError("build:js-dev", err);
    }
    gutil.log("[build:js-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});


/**
 * Tests
 */

require("./tasks/frontend-test-browser")(gulp, config);
require("./tasks/frontend-test-karma")(gulp, config);
