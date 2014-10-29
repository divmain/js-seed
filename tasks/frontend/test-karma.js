var
  path = require("path");

var
  karma = require("karma").server;

module.exports = function (gulp, config) {
  gulp.task("test-karma", "Auto-run unit tests in multiple browsers.", function (done) {
    karma.start({
      configFile: path.join(config.root, config.karmaConfig),
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

  gulp.task("test-phantom", "Run browser unit tests in the console.", function (done) {
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

  gulp.task("test-watch", "Run browser tests in console; run again on change.", function (done) {
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
};
