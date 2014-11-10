var
  config = require("./project.config"),
  webpackConfig = require("./webpack.config"),
  webpackDevConfig = require("./webpack.dev.config"),
  karmaConfig = require("./karma.config");

require("./tasks/composite")(gulp, config);
require("./tasks/lint")(gulp, config);
require("./tasks/frontend/clean")(gulp, config);
require("./tasks/frontend/copy")(gulp, config);
require("./tasks/frontend/build-css")(gulp, config);
require("./tasks/frontend/build-js")(gulp, webpackConfig);
require("./tasks/frontend/build-js-dev")(gulp, webpackDevConfig);
require("./tasks/frontend/test-browser")(gulp, config, webpackDevConfig);
require("./tasks/frontend/test-karma")(gulp, config, karmaConfig);
