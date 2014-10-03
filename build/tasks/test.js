"use strict";

var gulp = require("gulp");
var _ = require("lodash");
var path = require("path");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config");
var WebpackDevServer = require("webpack-dev-server");
var karma = require("karma").server;
var openUrl = require("open");
var config = require("../../project.config");
var handleError = require("../util/handle-errors");

_frontendTest = function (includeCoverage) {
  var server,
    wpConfig = Object.create(webpackConfig);

  wpConfig.entry = { test: [
    "webpack/hot/dev-server",
    "mocha!" + path.join(config.root, config.testRunner)
  ]};
  wpConfig.debug = true;
  wpConfig.devtool = "source-map";

  if (includeCoverage) {
    wpConfig.module.postLoaders = [{
      test: /^((?!(\/spec\/|\/node_modules\/)).)*$/,
      loader: "coverjs-loader"
    }];
  }

  wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  server = new WebpackDevServer(webpack(wpConfig), {
    hot: true,
    quiet: false,
    noInfo: false,
    watchDelay: 300,
    publicPath: "/",
    stats: {
      colors: true
    }
  });
  server.listen(9890, "localhost", function (err) {
    if (err) { throw new gutil.PluginError("[webpack-dev-server]", err); }
    openUrl("http://localhost:9890/webpack-dev-server/test.bundle");
  });

  return server;
};

gulp.task("test", "Run unit tests in the browser.", _.partial(_frontendTest, false));
gulp.task("test-coverage", "Run unit tests in browser, include coverage.",
  _.partial(_frontendTest, true));

gulp.task("test-karma", "Auto-run unit tests in multiple browsers.", function (done) {
  karma.start({
    configFile:  path.join(config.root, config.karmaConfig),
    browsers: ["Chrome", "Firefox", "Safari"],
    singleRun: true
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});

gulp.task("test-phantom", "Run browser unit tests in the console.", function (done) {
  karma.start({
    configFile: path.join(config.root, config.karmaConfig),
    browsers: ["PhantomJS"],
    singleRun: true
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});

gulp.task("test-watch", "Run browser tests in console; run again on change.", function (done) {
  karma.start({
    configFile: path.join(config.root, config.karmaConfig),
    browsers: ["PhantomJS"],
    singleRun: false
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});
