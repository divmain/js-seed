var
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");

var
  webpackConfig = require("../webpack.config");

module.exports = function (gulp) {
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
};
