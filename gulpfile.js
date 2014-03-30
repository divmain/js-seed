/**
 * Dependencies
 */

var _ = require("lodash");
var path = require("path");

var gulp = require("gulp");
var gutil = require("gulp-util");
var clean = require("gulp-clean");
var stylus = require("gulp-stylus");
var prefix = require("gulp-autoprefixer");
var connect = require("gulp-connect");
var gutil = require("gulp-util");
// var inject = require("gulp-inject");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");

var webpack = require("webpack");


/**
 * App Configuration
 */

var config = {
  src: "app",
  dest: "dist",
  srcFullPath: path.join(__dirname, "app"),
  destFullPath: path.join(__dirname, "dist"),
  root: __dirname,

  js: "js",
  assets: "assets",
  styles: "styles",

  port: 3000
};

config.webpack = {
  context: config.srcFullPath,
  cache: true,
  entry: {
    main: "./js/main.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    publicPath: path.join(config.dest, config.js),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  resolve: {
    alias: {
      "underscore": "lodash"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      _: "lodash"
    })
  ]
};


/**
 * Primary Task
 */

gulp.task("default", ["watch"], function () {});


/**
 * Component Tasks
 */

gulp.task("clean", function () {
  return gulp.src(path.join(config.dest, "*"))
    .pipe(clean());
});

gulp.task("copy", function () {
  gulp.src(
    path.join(config.srcFullPath, config.assets, "**/*"),
    { base: path.join(config.srcFullPath, config.assets) }
    )
    .pipe(gulp.dest(config.destFullPath));
});

gulp.task("lint", function () {
  gulp.src([
    path.join(config.srcFullPath, "js", "**/*.js"),
    path.join(config.root, "*.js"),
  ])
    .pipe(jshint(path.join(config.root, ".jshintrc")))
    .pipe(jshint.reporter(stylish));
});

gulp.task("connect", connect.server({
  root: ["dist"],
  livereload: true,
  port: config.port
}));


/**
 * Composite Tasks
 */

gulp.task("build", ["lint", "clean", "copy", "build:css", "build:js"]);

gulp.task("build-dev", ["lint", "clean", "copy", "build:css", "build:js-dev"]);

gulp.task("watch", ["build-dev"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), function () {
    gulp.run("build-dev");
  });
});

gulp.task("watch-reload", ["build-dev", "connect"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), function () {
    gulp.run("build-dev");
  });
});


/**
 * CSS Tasks
 */

gulp.task("build:css", function () {
  gulp.src(path.join(config.srcFullPath, config.styles, "*"))
    .pipe(stylus({
      use: ["axis-css"],
      set: ["compress"],
      define: { "ie8": true }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});


/**
 * JS Tasks
 */

gulp.task("build:js", function (callback) {
  var webpackConf = _.extend({}, config.webpack);

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

gulp.task("build:js-dev", function (callback) {

  var webpackConf = _.extend({}, config.webpack, {
    devtool: "sourcemap",
    debug: true
  });

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
