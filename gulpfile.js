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
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");

var mochaPhantomJS = require("gulp-mocha-phantomjs");

var webpack = require("webpack");


/**
 * App Configuration
 */

var config = {
  src: "app",
  dest: "dist",
  test: "dist-test",
  srcFullPath: path.join(__dirname, "app"),
  destFullPath: path.join(__dirname, "dist"),
  testFullPath: path.join(__dirname, "dist-test"),
  root: __dirname,

  js: "js",
  assets: "assets",
  styles: "styles",

  port: 3000,
  testPort: 3001
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
 * Composite Tasks
 */

gulp.task("default", ["watch"], function () {});

gulp.task("build", ["lint", "test-phantom"], function () {
  gulp.run("clean");
  gulp.run("copy");
  gulp.run("build:css");
  gulp.run("build:js");
});

gulp.task("build-dev", ["clean", "copy", "build:css", "build:js-dev"]);

gulp.task("watch", ["build-dev"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), function () {
    gulp.run("build-dev");
  });
});

gulp.task("watch-reload", ["build-dev", "server"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), function () {
    gulp.run("build-dev");
  });
});

gulp.task("test", ["build:test", "server:test"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), function () {
    gulp.run("build:test");
  });
});

gulp.task("test-phantom", ["build:test"], function () {
  return gulp
    .src("dist/spec/test-runner.html")
    .pipe(mochaPhantomJS());
});


/**
 * Component Tasks
 */

gulp.task("clean", function () {
  return gulp.src(path.join(config.dest, "*"))
    .pipe(clean());
});

gulp.task("copy", function () {
  return gulp.src(
    path.join(config.srcFullPath, config.assets, "**/*"),
    { base: path.join(config.srcFullPath, config.assets) }
    )
    .pipe(gulp.dest(config.destFullPath));
});

gulp.task("lint", function () {
  return gulp.src([
    path.join(config.srcFullPath, "js", "**/*.js"),
    path.join(config.srcFullPath, "spec/tests/**/*.js"),
    path.join(config.root, "*.js"),
  ])
    .pipe(jshint(path.join(config.root, ".jshintrc")))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter("fail"));
});

gulp.task("server", connect.server({
  root: [config.destFullPath],
  livereload: true,
  port: config.port
}));

gulp.task("server:test", connect.server({
  root: [config.testFullPath],
  open: {
    file: "test-runner.html"
  },
  livereload: true,
  port: config.testPort
}));


/**
 * CSS
 */

gulp.task("build:css", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*"))
    .pipe(stylus({
      use: ["axis-css"],
      set: ["compress"],
      define: { "ie8": true }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, "styles")));
});


/**
 * JS
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

/**
 * Tests
 */

gulp.task("build:test", function (callback) {
  gulp.src(path.join(config.srcFullPath, "spec/test-runner.html"))
    .pipe(gulp.dest(config.testFullPath));

  var webpackConf = _.extend({}, config.webpack, {
    entry: {
      test: "./spec/test-runner.js"
    },
    output: {
      path: config.testFullPath,
      publicPath: config.test,
      filename: "[name].bundle.js"
    },
    devtool: "sourcemap",
    debug: true
  });

  webpack(webpackConf, function (err) {
    if (err) {
      throw new gutil.PluginError("build:test", err);
    }
    callback();
  });
});
