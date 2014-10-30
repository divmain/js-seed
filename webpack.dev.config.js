var
  path = require("path");

var
  _ = require("lodash");

var
  webpackConfig = require("./webpack.config");


module.exports = _.merge(webpackConfig, {
  cache: true,
  devtool: "sourcemap",
  debug: true,
  output: {
    sourceMapFilename: "[file].map",
    hotUpdateMainFilename: "updates/[hash]/update.json",
    hotUpdateChunkFilename: "updates/[hash]/js/[id].update.js"
  },
  recordsOutputPath: path.join(__dirname, "records.json")
});

module.exports.module.loaders.push({
  test: /sinon\.js$/, loader: "imports?define=>false"
});

module.exports.plugins = [];
