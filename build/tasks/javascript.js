"use strict";

var gulp = require("gulp");
var _ = require("lodash");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config");
var config = require("../../project.config");
var handleError = require("../util/handle-errors");

gulp.task("build:js", "Build minified JS.", function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);

  webpackConf.plugins = webpackConf.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]);

  webpack(webpackConf, function (err, stats) {
    if (err) {
      throw new gutil.PluginError("build:js", err);
    }
    gutil.log("[build:js]", stats.toString({
      colors: true
    }));
    callback();
  });
});

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
