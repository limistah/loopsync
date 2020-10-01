var assert = require("assert");
const syncForEach = require("../index");

const noop = function () {};

describe("Loop Synchronously", function () {
  context("should throw when", function () {
    it("the first argument is not an array", function () {
      assert.throws(
        function () {
          syncForEach(123, noop, noop, 0);
        },
        Error,
        "First argument must be an array"
      );
    });
    it("the second argument is not a function", function () {
      assert.throws(
        function () {
          syncForEach([], 123, noop, 0);
        },
        Error,
        "Second argument(Handler) must be a function"
      );
    });

    it("the third argument is not a function", function () {
      assert.throws(
        function () {
          syncForEach([], noop, 123, 0);
        },
        Error,
        "Third argument(completeCallback) must be a function"
      );
    });

    it("the fourth argument is not a function", function () {
      assert.throws(
        function () {
          syncForEach([], noop, noop, "hello");
        },
        Error,
        "Fourth argument(currentIndex) must be a numver"
      );
    });
  });
});
