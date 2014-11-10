/*
  Rather than manage one giant gulpfile, each task has been broken out into its own file in the
  tasks directory. Any files in that directory get automatically required by the line below.
  To add a new task, simply add a new task file that directory.
*/

var
  _ = require("lodash"),
  minimist = require("minimist"),
  gulp = require("gulp"),
  gulpHelp = require("gulp-help"),
  requireDir = require("require-dir");

var
  config = require("./project.config.js");

// Update `gulp.task` signature to take task descriptions.
gulpHelp(gulp);

/**
 * Inject the project configuration into each Gulp task
 * @param {Object} gulpTasks An object containing each gulp task as a function. NOTE: This argument
 *                           can be nested to accommodate complex directory structure
 * @param {Object} config    An object containing project wide configuration
 */
var injectConfig = function (gulpTasks, config) {
  for (var task in gulpTasks) {
    if (gulpTasks.hasOwnProperty(task)) {
      if (_.isFunction(gulpTasks[task])) {
        gulpTasks[task](config);
      } else {
        injectConfig(gulpTasks[task]);
      }
    }
  }
};

// Process CLI flags
var cliOptions = minimist(process.argv.slice(2));
config = _.extend(config, {
  env: cliOptions.env || config.env
});

// Require all Gulp tasks
var gulpTasks = requireDir("./tasks", {recurse: true});
injectConfig(gulpTasks, config);
