window.chai = require("chai");
window.expect = chai.expect;
window.sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

require("spec/frontend/test-entry");

after(function() {
  require("coverjs-loader").reportHtml();

  var
    coverJsEl = document.querySelector(".coverjs-report"),
    mochaEl = document.querySelector("#mocha");
  if (coverJsEl) { mochaEl.appendChild(coverJsEl); }
});
