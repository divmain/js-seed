var
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");


module.exports = function (gulp, webpackConfig) {
  gulp.task("build:js-dev", "Build unminified JS with sourcemaps.", function (callback) {
    var webpackConf = _.cloneDeep(webpackConfig);

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
};
