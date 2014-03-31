describe("thing", function () {
  it("should do something", function () {
    expect(true).to.eql(false);
  });

  it("should do something else", sinon.test(function () {
    var thing = sinon.spy();
    thing("the-phone");
    expect(thing).to.have.been.calledWith("the-phone");
  }));
});
