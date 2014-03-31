document.write("<div id=\"mocha\"></div>");

require("!style!css!mocha/mocha.css");
require("!script!mocha/mocha.js");

window.expect = require("chai").expect;

window.sinon = _.extend({}, require("sinon"), {
  spy: require("sinon/lib/sinon/spy"),
  spyCall: require("sinon/lib/sinon/call"),
  behavior: require("sinon/lib/sinon/behavior"),
  stub: require("sinon/lib/sinon/stub"),
  // mock: require("sinon/lib/sinon/mock"),
  collection: require("sinon/lib/sinon/collection"),
  assert: require("sinon/lib/sinon/assert"),
  sandbox: require("sinon/lib/sinon/sandbox"),
  test: require("sinon/lib/sinon/test"),
  testCase: require("sinon/lib/sinon/test_case"),
  match: require("sinon/lib/sinon/match")
});

mocha.setup("bdd");

require("./tests/test-entry");

if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    module.suite.suites.length = 0;
    var stats = document.getElementById("mocha-stats");
    stats.parentNode.removeChild(stats);
  });
}
