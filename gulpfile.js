/*
  Rather than manage one giant gulpfile, each task has been broken out into its own file in the
  tasks directory. Any files in that directory get automatically required by the line below.
  To add a new task, simply add a new task file that directory.
*/

var
  gulp = require("gulp"),
  gulpHelp = require("gulp-help"),
  requireDir = require("require-dir");

// Update `gulp.task` signature to take task descriptions.
gulpHelp(gulp);

requireDir("./gulp-tasks", {recurse: true});
