var
  path = require("path"),
  config = require("./project.config");

module.exports = {
  context: config.srcFullPath,
  cache: true,
  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    publicPath: config.js + "/",
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.styl$/, loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader" },
      { test: /\.tmpl$/, loader: "raw" },
      { test: /sinon\.js$/, loader: "imports?define=>false" }
    ]
  },
  resolve: {
    root: config.root
  },
  plugins: []
};
