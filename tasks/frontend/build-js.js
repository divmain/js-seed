var
  gulp = require("gulp"),
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");

var
  webpackConfig = require("../../webpack.config");

gulp.task("build:js", "Build minified JS.", function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);

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
