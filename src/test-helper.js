module.exports = {
  captureExceptions: function (done, fn) {
    return function () {
      try {
        fn();
        done();
      } catch (error) {
        done(error);
      }
    };
  }
};
