var
  path = require("path");

var
  webpack = require("webpack");

var
  config = require("./project.config");

module.exports = {
  context: config.frontendFullPath,
  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.styl$/, loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader" },
      { test: /\.tmpl$/, loader: "raw" }
    ]
  },
  resolve: {
    root: config.root
  },
  plugins: [
    new webpack.DefinePlugin({
      "ENVIRONMENT": JSON.stringify("PROD")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
