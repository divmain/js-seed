window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");
window.chai.use(require("sinon-chai"));

require("spec/frontend/test-entry");

after(function() {
  var coverJsEl, mochaEl;
  require("coverjs-loader").reportHtml();

  coverJsEl = document.querySelector(".coverjs-report");
  mochaEl = document.querySelector("#mocha");
  if (coverJsEl) { mochaEl.appendChild(coverJsEl); }
});
