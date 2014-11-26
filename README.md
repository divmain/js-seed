# The JavaScript Seed

One of the most common blockers to starting a new project is boilerplate.  Not many of us want to spend days setting up build and test infrastructure - we want to get coding while the idea is fresh.

Ideally,

- Starting a new frontend project should take less than 5 minutes.
- The developer should not have to sacrifice the robustness of build tools or test infrastructure for the sake of a quick start.
- Tests should be easy to write, quick to run, and straight-forward to debug.
- The developer should only have to make decisions specific to the project.
- Because not all developers have the same level of experience, "the build" should be as comprehensible as possible.

This project aims to:

- Be narrow in scope, providing only build and test infrastructure, remaining agnostic to frontend libraries or frameworks;
- Ease the developer experience, by providing a well documented and discoverable build; and
- Provide a foundation for a variety of frontend applications.


## Getting Started

Clone the repo locally, providing the name of your new project:

```bash
cd <YOUR_WORKING_DIRECTORY>
git clone https://github.com/divmain/js-seed.git <YOUR_PROJECT_NAME>
cd <YOUR_PROJECT_NAME>
```

A quick-start script is provided to help you get things set up.  To run it, type `./start.sh` into your console.  It will:

- clean up all files related to the js-seed project;
- configure `package.json` with your name, email and project name;
- offer a selection of licenses that you can use for your project, and enter your contact information in the copyright notices;
- offer a selection of CI integration options;
- offer to setup a remote [Github](https://github.com/) or [Bitbucket](https://bitbucket.org/) repository; and
- initialize a new Git history.

Using this script is optional, and you should feel free to do the work manually if you have special requirements.

Finally, run `npm install`.


## Tasks

When working on a project, a lot of your time will be spent in the terminal running Gulp tasks.  To see what tasks are available, type `gulp` or `gulp help` into your console.

You should see something like the following:

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


## The Stack

Before going any further, you should be introduced to the tools that you have at your disposal.  If you come across questions that are unanswered in this README, check the following sites for documentation.

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
- CSS (this is used for the build and need not be used in your application)
    - [Stylus](http://learnboost.github.io/stylus/) - expressive CSS pre-processor
    - [Autoprefixer](https://github.com/ai/autoprefixer) - automatic vendor prefix handling


## Tests and Application Code

The project is configured in such a way that you can write tests anywhere you want in the `frontend` directory.  Test files will be identified by their extension: `.spec.js`.  To keep things organized, we recommend creating one spec file for each application file, and placing that spec file in the same location.

### Example test and application code

To see this in action, open up `frontend/js/main.js` and `frontend/js/main.spec.js`.  The latter contains code that tests the functionality of the former.

`main.js` is written using the [CommonJs](http://dailyjs.com/2010/10/18/modules/) pattern - you will see that it returns a function.  This function always returns true.  It also calls a function if one is provided.  That sounds like testable functionality!

In `main.spec.js`, you will see some comments explaining how things are layed out, and why.  You'll also see a couple of tests that correspond to the functionality we identified.

As you develop your project, keep track of the functionality you're implementing, and write tests!  Then, as requirements change and complexity increases, you can be confident that you haven't broken anything.

### Running tests

To run these tests, we have a few options.  For a terminal-only experience, use `gulp test-phantom`.  This will run your tests in a headless browser, and you'll see the results in your console.  If you run `gulp test-watch`, tests will run once and then wait.  If any of your test or application code changes, they'll run again automatically.

To run your tests in multiple browsers, try `gulp test-karma`.  You'll see browser windows pop up, and the results will be reported in your terminal.

Finally, you can try something more interactive.  Run `gulp test`.  A browser window will appear and a report of your tests will be compiled as your tests are run.  You can set breakpoints using Firebug or Chrome Dev-tools in your test or application code to help debug.  Additionally, if any of your test or application code changes, the tests related to that code (and only those tests) will run again.  This will save you time and headaches as your test suite grows.


## Linting Your Code

As a project grows, and especially when multiple developers contribute, it becomes increasingly valuable to enforce a particular code style.  This seed project provides a default code style configuration.  Feel free to modify it to fit your preferences (`.eslintrc`); the most important thing is consistency across the project.

To check your code for non-compliance with the code style, as well as running sanity checks for common problems, use `gulp lint`.  If all your code passes, you'll see a `[lint] SUCCESS!` message.  Any problems that are found will be specifically pointed out, followed by `*** FAILED ESLINT ***`.


## Pulling in Templates or Styles

As a convenience, this seed project provides easy mechanisms to write templates and CSS styles.  By default, `frontend/styles/main.styl` is processed by Stylus and saved as `main.css` in the output directory.  From inside a JS file, you can also require a module-specific Stylus file (something like `require("./my-view.styl");`), and those styles will automatically be loaded into the browser when the requiring JS module is loaded.

The Webpack configuration also supplies a mechanism to require files as plain text.  This is very useful for accessing templates.  It'll look something like `var myTemplateString = require("./my-template.tmpl");`.  By default, this only works for files with extension `.tmpl`, but new rules can be created in `webpack.config.js`.

Keep in mind that while Stylus support is provided out-of-the-box, plain CSS is also supported.  I'm actively looking into adding support for LESS/SASS alongside Stylus.

## Project Layout

| File/Directory          | Description                                                                               |
| ----                    | ----                                                                                      |
| project.config.js       | Defines paths and other global config.                                                    |
| gulpfile.js             | Configures the `gulp` tool with any JS files found under `gulp-tasks`.                    |
| karma.conf.js           | Configures Karma to run the test suite.                                                   |
| webpack.config.js       | Webpack configuration for building JS files.                                              |
| webpack.dev.config.js   | Webpack configuration for building development-specific JS files.                         |
| .eslintrc               | JavaScript linting rules - this encourages you to make your code consistent and readable. |
| wercker.yml             | Wercker CI configuration.                                                                 |
| .travis.yml             | Travis CI configuration.                                                                  |
| frontend/               | Application and test code.                                                                |
| frontend/assets/        | Static files.                                                                             |
| frontend/js/            | Application JS files.  Each `.js` has a `.spec.js` counterpart.                           |
| frontend/styles/        | Stylus files.                                                                             |
| frontend/test-runner.js | Configures and executes tests.                                                            |
| frontend-dist/          | Builds are generated here.                                                                |
| gulp-tasks/             | Component gulp tasks                                                                      |


## License

This seed project is provided under the [MIT License](http://opensource.org/licenses/MIT).  This applies to the js-seed project itself, and not to projects generated by it.  Attribution in seeded projects is appreciated but definitely not required.
