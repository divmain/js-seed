var main = require("./main");

/**
 * We recommend that you wrap all of your tests in `describe` blocks
 * that correspond to the path of the file that you are testing.  This
 * makes it easy to find the file in question when a test fails, and
 * it disambiguates tests that may otherwise look similar.
 */

describe("frontend/js/", function () {
  describe("main", function () {
    var sandbox;

    beforeEach(function () {

      /**
       * Before each test is run, we create a new Sinon sandbox that
       * we can use for stubbing and spying on our application code.
       */

      sandbox = sinon.sandbox.create();
    });

    afterEach(function () {

      /**
       * If you use `sinon.stub` or `sinon.spy` instead of the sandbox
       * pattern, make sure to restore them here!  If you don't, the
       * functionality of the stubbed/spied-upon functions will remain
       * altered, and you could unintentionally break other tests.
       */

      sandbox.restore();
    });

    it("should always return true", function () {

      /**
       * We are describing "frontend/js/main", and asserting that it
       * will always return true.
       */

      expect(main()).to.be.true;
    });

    it("should call the provided function with `false`", function () {

      /**
       * Chai provides a whole host of assertions.  Check the documentation
       * for a full list.  In addition to those, the seed project includes
       * sinon-chai, which adds assertions related to sinon stubs and spies.
       */

      var testFn = sandbox.spy();
      main(testFn);
      expect(testFn).to.have.been.calledWith(false);
    });
  });
});
