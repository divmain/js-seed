var
  projectConfig = require("./project.config"),
  webpackConfig = require("./webpack.config"),
  _ = require("lodash");

webpackConfig = _.clone(webpackConfig);

delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    basePath: projectConfig.root,
    frameworks: ["mocha", "sinon-chai"],
    files: [ "frontend/spec/js/**/*.js" ],
    exclude: [],
    preprocessors: { "frontend/**/*.js": ["webpack"] },
    webpack: webpackConfig,
    webpackServer: {
      hot: true,
      quiet: true,
      noInfo: false,
      stats: {
        colors: true
      }
    },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    autoWatch: true,
    captureTimeout: 60000,
    singleRun: true,

    // - config.LOG_DISABLE
    // - config.LOG_ERROR
    // - config.LOG_WARN
    // - config.LOG_INFO
    // - config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // - Chrome (karma-chrome-launcher)
    // - Firefox (karma-firefox-launcher)
    // - Opera (karma-opera-launcher)
    // - Safari (karma-safari-launcher)
    // - PhantomJS (karma-phantomjs-launcher)
    // - IE (karma-ie-launcher)
    browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"],

    plugins: [
      require("karma-mocha"),
      require("karma-sinon-chai"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-safari-launcher"),
      require("karma-webpack")
    ]
  });
};
