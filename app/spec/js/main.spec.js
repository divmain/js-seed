define([
  "app/js/main"
], function (
  main
) {
  describe("main", function () {
    it("should be true", function () {
      expect(main).to.be.true;
    });

    it("should do something", sinon.test(function () {
      var thing = sinon.spy();
      thing("the-phone");
      expect(thing).to.have.been.calledWith("the-phone");
    }));

  });
});
