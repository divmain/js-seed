var
  gulp = require("gulp"),
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");

var
  webpackDevConfig = require("../../webpack.dev.config"),
  webpackConfig = require("../../webpack.config");

module.exports = function(config) {
  gulp.task("build:js", "Build JavaScript.", function (callback) {
    var webpackConf;
    if (config.env === "production") {
      webpackConf = _.cloneDeep(webpackConfig);
    } else {
      webpackConf = _.cloneDeep(webpackDevConfig);
    }

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
};
