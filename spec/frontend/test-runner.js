window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");
window.chai.use(require("sinon-chai"));

require("spec/frontend/test-entry");
