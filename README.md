# Javascript Seed Project

A place for starting new front-end JS projects.  Just clone and go.

This project is agnostic towards the specifics of your browser implementation or framework, but provides a straight-forward build-and-test stack to help you get started.

## Stack

- [gulp](http://gulpjs.com/)
- [webpack](http://webpack.github.io/)
- [Mocha](http://visionmedia.github.io/mocha/)
- [Chai](http://chaijs.com/)
- [Sinon.JS](http://sinonjs.org)
- [Lodash](http://lodash.com)

### Helpers

- [sinon-chai](https://github.com/domenic/sinon-chai)
- [chai-jquery](https://github.com/chaijs/chai-jquery)

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




