var
  gulp = require("gulp"),
  _ = require("lodash"),
  karma = require("karma").server;

var
  karmaConfig = require("../../karma.config");

module.exports = function(config) {
  gulp.task("test-karma", "Auto-run unit tests in multiple browsers.", function (done) {
    var karmaConf = _.cloneDeep(karmaConfig);

    karmaConf.browsers = ["Chrome", "Firefox", "Safari"];
    karmaConf.singleRun = true;

    karma.start(karmaConf, function (err) {
      if (err) {
        done(err);
        process.exit(1);
      }
      done();
      process.exit(0);
    });
  });

  gulp.task("test-phantom", "Run browser unit tests in the console.", function (done) {
    var karmaConf = _.cloneDeep(karmaConfig);

    karmaConf.browsers = ["PhantomJS"];
    karmaConf.singleRun = true;

    karma.start(karmaConf, function (err) {
      if (err) {
        done(err);
        process.exit(1);
      }
      done();
      process.exit(0);
    });
  });

  gulp.task("test-coverage", "Run browser unit tests in the console.", function (done) {
    var karmaConf = _.cloneDeep(karmaConfig);

    karmaConf.webpack.module.postLoaders = [{
      test: /\.js$/,
      exclude: /(spec|node_modules)\//,
      loader: "istanbul-instrumenter"
    }];

    karmaConf.browsers = ["PhantomJS"];
    karmaConf.singleRun = true;
    karmaConf.plugins.push(require("karma-js-coverage"));
    karmaConf.reporters.push("coverage");
    karmaConf.coverageReporter = {
      type: "text"
    };

    karma.start(karmaConf, function (err) {
      if (err) {
        done(err);
        process.exit(1);
      }
      done();
      process.exit(0);
    });
  });

  gulp.task("test-watch", "Run browser tests in console; run again on change.", function (done) {
    var karmaConf = _.cloneDeep(karmaConfig);

    karmaConf.browsers = ["PhantomJS"];
    karmaConf.singleRun = false;

    karma.start(karmaConf, function (err) {
      if (err) {
        done(err);
        process.exit(1);
      }
      done();
      process.exit(0);
    });
  });
};
