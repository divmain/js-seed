var _frontendTest,
  path = require("path"),
  _ = require("lodash"),

  // Gulp
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  clean = require("gulp-clean"),
  stylus = require("gulp-stylus"),
  prefix = require("gulp-autoprefixer"),
  eslint = require("gulp-eslint"),
  openUrl = require("open"),
  webserver = require("gulp-webserver"),

  // Tests
  karma = require("karma").server,

  // Webpack
  webpack = require("webpack"),
  WebpackDevServer = require("webpack-dev-server"),

  // Application config
  config = require("./project.config"),
  webpackConfig = require("./webpack.config");


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

gulp.task("build-dev", ["clean"], function () {
  gulp.run("copy");
  gulp.run("build:css");
  gulp.run("build:js-dev");
});

gulp.task("watch", ["build-dev"], function () {
  gulp.watch(path.join(config.srcFullPath, "**/*"), ["build-dev"]);
});

// gulp.task("reload", ["build-dev", "reload:server"], function () {
//   gulp.watch(path.join(config.srcFullPath, "**/*"), ["build-dev"]);
// });


// /**
//  * Component Tasks
//  */

gulp.task("clean", function () {
  return gulp.src(path.join(config.dest, "*"))
    .pipe(clean());
});

gulp.task("copy", function () {
  return gulp.src(
    path.join(config.srcFullPath, config.assets, "**/*"),
    { base: path.join(config.srcFullPath, config.assets) }
  ).pipe(gulp.dest(config.destFullPath));
});

gulp.task("lint", function () {
  return gulp.src([
    path.join(config.srcFullPath, config.js, "**/*.js"),
    path.join(config.srcFullPath, "spec/js", "**/*.js"),
    path.join(config.root, "*.js")
  ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("reload:server", function () {
  gulp.src(config.destFullPath)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port: config.port,
      open: "/",
      https: false
    }));
});


/**
 * CSS
 */

gulp.task("build:css", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*"))
    .pipe(stylus({
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

gulp.task("build:js-dev", function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);
  webpackConf.devtool = "sourcemap";
  webpackConf.debug = true;

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

_frontendTest = function (includeCoverage) {
  var server,
    wpConfig = Object.create(webpackConfig);

  wpConfig.entry = { test: "mocha!" + path.join(config.root, config.testRunner) };
  wpConfig.debug = true;
  wpConfig.devtool = "source-map";

  if (includeCoverage) {
    wpConfig.module.postLoaders = [{
      test: new RegExp(path.join(config.src, config.js)),
      loader: "coverjs-loader"
    }];
  }

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
    openUrl("http://localhost:9890/test.bundle");
  });

  return server;
};

gulp.task("test", _.partial(_frontendTest, false));
gulp.task("test-coverage", _.partial(_frontendTest, true));

gulp.task("test-karma", function (done) {
  karma.start({
    configFile:  path.join(config.root, config.karmaConfig),
    browsers: ["Chrome", "Firefox", "Safari"],
    singleRun: true
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});

gulp.task("test-phantom", function (done) {
  karma.start({
    configFile: path.join(config.root, config.karmaConfig),
    browsers: ["PhantomJS"],
    singleRun: true
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});

gulp.task("test-watch", function (done) {
  karma.start({
    configFile: path.join(config.root, config.karmaConfig),
    browsers: ["PhantomJS"],
    singleRun: false
  }, function (err) {
    if (err) {
      done(err);
      process.exit(1);
    }
    done();
    process.exit(0);
  });
});
