var
  gulp = require("gulp"),
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");

var
  webpackDevConfig = require("../../webpack.dev.config");

gulp.task("build:js-dev", "Build unminified JS with sourcemaps.", function (callback) {
  var webpackConf = _.cloneDeep(webpackDevConfig);

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
