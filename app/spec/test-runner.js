document.write("<div id=\"mocha\"></div>");

require("!style!css!mocha/mocha.css");
require("!script!mocha/mocha.js");
require("!script!sinon/pkg/sinon.js");

window.expect = require("chai").expect;


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
