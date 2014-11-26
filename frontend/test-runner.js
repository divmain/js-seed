var _ = require("lodash");

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

var specFileRequire = require.context(".", true, /\.spec\.js$/);

/**
 * This creates a DOM element with ID "fixtures".  It is visible,
 * but far off to the left of the viewable screen.  When testing
 * your views, they can be mounted here.
 */

var fixturesEl = document.createElement("div");
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

_.each(_.keys(specFileRequire), function (specFileName) {
  specFileRequire(specFileName);
});
