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
    - [Istanbul](http://gotwarlost.github.io/istanbul/) - test code coverage
- Libraries
    - [Lo-Dash](http://lodash.com) - utility library, an alternative to Underscore.js
- CSS
    - [Stylus](http://learnboost.github.io/stylus/) - expressive CSS pre-processor
    - [Autoprefixer](https://github.com/ai/autoprefixer) - automatic vendor prefix handling

## Tasks

To get started, type `gulp` or `gulp help` into your console.  You should see something like the following:

```text
[23:19:40] Starting 'help'...

Usage
  gulp [task]

Available tasks
  build          Copy assets, build CSS and JS.
  build-dev      Build, but with unminified JS + sourcemaps.
  build:css      Build CSS.
  build:js       Build minified JS.
  build:js-dev   Build unminified JS with sourcemaps.
  help           Display this help text.
  lint           Lint application- and test-code.
  test           Run unit tests in the browser.
  test-coverage  Run browser unit tests in the console.
  test-karma     Auto-run unit tests in multiple browsers.
  test-phantom   Run browser unit tests in the console.
  test-watch     Run browser tests in console; run again on change.
  watch          Perform build-dev when sources change.

[23:19:40] Finished 'help' after 1.48 ms
```


## Project Layout

| File/Directory          | Description                                                     |
| ----                    | ----                                                            |
| start.sh                | Quick-start script.                                             |
| gulpfile.js             | High-level definitions for gulp tasks.                          |
| project.config.js       | Defines paths and other global config.                          |
| karma.conf.js           | Karma configuration.                                            |
| webpack.config.js       | Webpack configuration.                                          |
| webpack.dev.config.js   | Webpack configuration for dev tasks.                            |
| .eslintrc               | JavaScript linting rules.                                       |
| wercker.yml             | Wercker CI configuration.                                       |
| frontend/               | Application and test code.                                      |
| frontend/assets/        | Static files.                                                   |
| frontend/js/            | Application JS files.  Each `.js` has a `.spec.js` counterpart. |
| frontend/styles/        | Stylus files.                                                   |
| frontend/test-runner.js | Configures and executes tests.                                  |
| frontend-dist/          | Builds are generated here.                                      |
| tasks/                  | Component gulp tasks                                            |
