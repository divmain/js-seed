# Javascript Seed Project

A place for starting new front-end JS projects.  Just clone and go.

This project is agnostic towards the specifics of your browser implementation or framework, but provides a straight-forward build-and-test stack to help you get started.

## Stack

- Build
    - [gulp](http://gulpjs.com/) - a task runner and build tool
    - [webpack](http://webpack.github.io/) - a module bundler that accepts/outputs CommonJS/AMD/UMD
- Tests
    - [mocha](http://visionmedia.github.io/mocha/) - test framework
    - [Chai](http://chaijs.com/) - assertion framework
    - [Sinon.JS](http://sinonjs.org) - spies, stubs, and mocks
    - [sinon-chai](https://github.com/domenic/sinon-chai) - Chai assertions for Sinon objects
    - [chai-jquery](https://github.com/chaijs/chai-jquery) - Chai assertions for jQuery objects
    - [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs) - enables front-end testing from the terminal
    - [Karma](http://karma-runner.github.io/) - automated testing in multiple browsers (Chrome, Firefox, Sarafi enabled by default)
- Libraries
    - [Lo-Dash](http://lodash.com) - a utility library, an alternative to Underscore.js
    - [jQuery](http://jquery.com/)
- CSS
    - [Stylus](http://learnboost.github.io/stylus/) - an expressive CSS pre-processor
    - [Autoprefixer](https://github.com/ai/autoprefixer) - automatic vendor prefix handling
    - [Axis](http://roots.cx/axis/) - powerful Stylus library

## Tasks

You can find the tasks you'll run directly in the **Composite Tasks** section of `gulpfile.js`.  Here is a quick run-through of the options available to you.

| Invocation          | Description                                                                   |
| ----:               | ----                                                                          |
| `gulp`              | Runs `gulp watch`.                                                            |
| `gulp build`        | Lints and tests your source.  Then does a clean build of assets, CSS, and JS. |
| `gulp build-dev`    | Does a clean build of assets, CSS, and JS (with source maps).                 |
| `gulp watch`        | Runs `gulp build-dev` any time a file changes in your app directory.          |
| `gulp reload`       | Same as `gulp watch`, except it triggers a page refresh using LiveReload.     |
| `gulp test`         | Builds necessary files and launches a browser window to run the test suite.   |
| `gulp test-phantom` | Runs test suite in the terminal, using Mocha-PhantomJS.                       |

## Project Layout

| File/Directory               | Description                                                                 |
| ----                            | ----                                                                           |
| gulpfile.js                  | Defines all tasks for gulp and webpack.                                     |
| app/                         | All source files go here.                                                   |
| app/assets/                  | Static files go here and are copied into destination dir on build.          |
| app/js/                      | All your JS files go here.                                                  |
| app/js/main.js               | Main entry point into your application.                                     |
| app/spec/tests/              | All your front-end tests go here.                                           |
| app/spec/tests/test-entry.js | Entry point into your front-end tests.  Require additional tests from here. |
| app/styles/                  | All your Stylus files go here.                                              |
| app/styles/main.styl         | Preconfigured Stylus file.                                                  |
| dist/                        | Builds (normal and dev) are placed here.                                    |
| dist-test/                   | Test builds are placed here.                                                |




