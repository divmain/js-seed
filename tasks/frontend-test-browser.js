var
  path = require("path");

var
  _ = require("lodash"),
  openUrl = require("open"),
  gutil = require("gulp-util"),
  webpack = require("webpack"),
  WebpackDevServer = require("webpack-dev-server");

module.exports = function (gulp, config, webpackConfig) {
  var _frontendTest = function (includeCoverage) {
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
};
