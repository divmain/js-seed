var
  path = require("path");

var
  config = require("./project.config");

module.exports = {
  context: config.frontendFullPath,
  cache: true,
  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    sourceMapFilename: "[file].map",
    hotUpdateMainFilename: "updates/[hash]/update.json",
    hotUpdateChunkFilename: "updates/[hash]/js/[id].update.js"
  },
  recordsOutputPath: path.join(__dirname, "records.json"),
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
