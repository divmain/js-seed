var
  gulp = require("gulp"),
  gulpHelp = require("gulp-help"),
  requireDir = require("require-dir");

/**
 * This modifies the `gulp.task` function to take an additional argument.
 * The argument should be a short string that describes the task; it will
 * be displayed when `gulp help` is run from the console.
 */

gulpHelp(gulp);

/**
 * Rather than manage one giant gulpfile, each task is broken out into its
 * own file in the `gulp-tasks` directory.  Any files in that directory will be
 * automatically required by the line below.
 *
 * To add a new task, simply add a new file under `gulp-tasks`.
 */

requireDir("./gulp-tasks", { recurse: true });
