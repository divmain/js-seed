var _ = require("lodash");

var specFileRequire, fixturesEl;

/**
 * This is the Webpack voo-doo that makes it so easy to add spec
 * files.  It will recursively traverse the current directory,
 * checking for any files that end in .spec.js, bundling them
 * and making them accessible via the special `specFileRequire`
 * function.  These test modules are explicitly required in below.
 *
 * For more information, read the documentation here:
 *   https://github.com/webpack/docs/wiki/context/
 *   71f80252750e1d8f4b6b40395855e0dd5cca6d12#requirecontext
 */

specFileRequire = require.context(".", true, /\.spec\.js$/);

/**
 * Object.keys is used by require.context for its `keys` method.
 * Since this method is not supported in older browsers, polyfill
 * with _.keys.
 */

if (!Object.keys) {
  Object.keys = _.keys;
}

/**
 * Some of the webpack plug-ins may rely on native `bind`, and
 * PhantomJS does not include it.  Polyfill!
 */

if (typeof Function.prototype.bind !== "function") {
  /* eslint-disable no-extend-native */
  Function.prototype.bind = function bind(obj) {
  /* eslint-enable no-extend-native */
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    var NoOp = function () {};
    var bound = function () {
      return self.apply(
        this instanceof NoOp ? this : obj || {},
        args.concat(Array.prototype.slice.call(arguments))
      );
    };
    NoOp.prototype = this.prototype || {};
    bound.prototype = new NoOp();
    return bound;
  };
}

/**
 * This creates a DOM element with ID "fixtures".  It is visible,
 * but far off to the left of the viewable screen.  When testing
 * your views, they can be mounted here.
 */

fixturesEl = document.createElement("div");
fixturesEl.setAttribute("id", "fixtures");
document.querySelector("body").appendChild(fixturesEl);
fixturesEl.style.position = "absolute";
fixturesEl.style.left = "5000px";

/**
 * This loads Chai (assertion library) and Sinon (mock/stub
 * library) into the global context, for both in-browser
 * and Karma tests.
 */

window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");
window.chai.use(require("sinon-chai"));

/**
 * Requires in all spec files.  See above comment.
 */

_.each(specFileRequire.keys(), function (specFileName) {
  specFileRequire(specFileName);
});
