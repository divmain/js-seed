var _ = require("lodash");
var requireCxt = require.context(".", true, /\.spec\.js$/);

// polyfill Object.keys for IE<=8
if (!Object.keys) {
  Object.keys = _.keys;
}

window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");
window.chai.use(require("sinon-chai"));

_.each(requireCxt.keys(), function (specFileName) {
  requireCxt(specFileName);
});
