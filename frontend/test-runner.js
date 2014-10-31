var _ = require("lodash");
// https://github.com/webpack/docs/wiki/context/
//   71f80252750e1d8f4b6b40395855e0dd5cca6d12#requirecontext
var specFileRequire = require.context(".", true, /\.spec\.js$/);

// polyfill Object.keys for IE<=8
if (!Object.keys) {
  Object.keys = _.keys;
}

window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");
window.chai.use(require("sinon-chai"));

_.each(specFileRequire.keys(), function (specFileName) {
  specFileRequire(specFileName);
});
