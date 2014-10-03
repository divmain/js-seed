/*
  gulpfile.js
  ===========
  Each task has been broken out into its own file in build/tasks. Any files in that directory get
  automatically required below. To add a new task, simply add a new task file that directory.

  gulp/tasks/default.js specifies the default set of tasks to run when you run `gulp`.
*/

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./build/tasks', { recurse: true });
