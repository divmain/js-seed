var
  path = require("path");

var
  gulp = require("gulp"),
  openUrl = require("open"),
  gutil = require("gulp-util"),
  webpack = require("webpack"),
  WebpackDevServer = require("webpack-dev-server");

var
  webpackDevConfig = require("../../webpack.dev.config");

module.exports = function(config) {
  gulp.task("test", "Run unit tests in the browser.", function () {
    var server,
      wpConfig = Object.create(webpackDevConfig);

    wpConfig.entry = { test: [
      "webpack/hot/dev-server",
      "mocha!" + path.join(config.root, config.testRunner)
    ]};

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
  });
};
