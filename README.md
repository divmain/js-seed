# Javascript Seed Project

A place for starting new front-end JS projects.  Just clone and go.

This project is agnostic in regards to your framework or implementation, but provides a straight-forward build-and-test stack to help you get started.


## Quick Start

To begin a new project, run the following commands in your terminal window:

```
cd YOUR_WORKING_DIR
git clone https://github.com/divmain/js-seed.git PROJECT_NAME
cd PROJECT_NAME/
./start.sh
npm install
```

`start.sh` will remove the js-seed README and itself.  It will also re-initialize git for the project directory and optionally create a new remote repository for you in GitHub or BitBucket.


## Stack

- Build
    - [gulp](http://gulpjs.com/) - a task runner and build tool
    - [webpack](http://webpack.github.io/) - a module bundler that accepts/outputs CommonJS/AMD/UMD
- Tests
    - [mocha](http://visionmedia.github.io/mocha/) - test framework
    - [Chai](http://chaijs.com/) - assertion framework
    - [Sinon.JS](http://sinonjs.org) - spies, stubs, and mocks
    - [Karma](http://karma-runner.github.io/) - automated testing in multiple browsers (Chrome, Firefox, Sarafi enabled by default) and in the console
    - [CoverJs](https://github.com/webpack/coverjs-loader) - code coverage statistics for your tests
- Libraries
    - [Lo-Dash](http://lodash.com) - utility library, an alternative to Underscore.js
- CSS
    - [Stylus](http://learnboost.github.io/stylus/) - expressive CSS pre-processor
    - [Autoprefixer](https://github.com/ai/autoprefixer) - automatic vendor prefix handling

## Tasks

To get started, type `gulp` or `gulp help` into your console.  You should see something like the following:

```text
[gulp] Starting 'help'...

Usage
  gulp [task]

Available tasks
  build          Copy assets, build CSS and JS.
  build-dev      Build, but with unminified JS + sourcemaps.
  build:css      Build CSS.
  build:js       Build minified JS.
  build:js-dev   Build unminified JS, including sourcemaps.
  help           Display this help text.
  lint           Lint application- and test-code.
  test           Run unit tests in the browser.
  test-coverage  Run unit tests in browser, include coverage.
  test-karma     Auto-run unit tests in multiple browsers.
  test-phantom   Run browser unit tests the console.
  test-watch     Run browser unit tests in console, run again on change.
  watch          Perform build-dev when sources change.

[gulp] Finished 'help' after 1.32 ms
```


## Project Layout

| File/Directory              | Description                            |
| ----                        | ----                                   |
| start.sh                    | Quick-start script.                    |
| gulpfile.js                 | Defines all tasks for gulp.            |
| project.config.js           | Defines paths and other global config. |
| karma.conf.js               | Karma configuration.                   |
| webpack.config.js           | Webpack configuration.                 |
| .eslintrc                   | JavaScript linting rules.              |
| frontend/                   | Application code.                      |
| frontend/assets/            | Static files.                          |
| frontend/js/                | Application JS files.                  |
| frontend/styles/            | Stylus files.                          |
| frontend/spec/js/           | All tests.                             |
| frontend/spec/test-entry.js | All tests should be required in here.  |
| frontend-dist/              | Builds are generated here.             |
