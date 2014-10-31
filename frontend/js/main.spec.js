var main = require("./main");
var sandbox;

describe("the main thing", function () {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should be true", function () {
    expect(main).to.be.true;
  });

  it("should do something", function () {
    var thing = sandbox.spy();
    thing("the-phone");
    expect(thing).to.have.been.calledWith("the-phone");
  });

});
