var
  path = require("path");

var
  webpack = require("webpack");

var
  config = require("./project.config");

module.exports = {
  context: config.frontendFullPath,

  /**
   * Based on the configuration below, a `main.bundle.js` file will be generated
   * from the file specified in `entry.main` along with its dependencies. You can
   * create additional entry points and Webpack will intelligently bundle them
   * for you.
   */

  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },

  /**
   * The following loaders define alternate behavior for `require` expressions in
   * your JS modules.
   *
   * Any CSS files will go through the style-loader (meaning that
   * they'll be loaded into the document when the JS file is required).  Any
   * Stylus files will be processed by Stylus to generate CSS, run through auto-
   * prefixer to add CSS vendor prefixes, and then treated as CSS files inside
   * your application.
   *
   * Files ending in `.tmpl` will be required into your application as plain text.
   * Modify this entry or create a new entry if you prefer to use a different
   * extension for your templates.
   */

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.styl$/, loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader" },
      { test: /\.tmpl$/, loader: "raw" }
    ]
  },

  /**
   * This defines the "root" of your project.  If you `require("some-package")`
   * from within your application JS, Webpack will first check the directory
   * specified in config.root for `some-package.js` before checking node_modules.
   */

  resolve: {
    root: config.root
  },

  /**
   * For production deployments, we want minified and optimized JS.  These
   * settings are overridden in webpack.dev.config.js.
   */

  plugins: [
    new webpack.DefinePlugin({
      "ENVIRONMENT": JSON.stringify("PROD")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
