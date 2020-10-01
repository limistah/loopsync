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

  context("should call the function:", function () {
    it("handler", function () {
      syncForEach(
        Array.from({ length: 12 }).fill(0),
        function handler(item) {
          assert.equal(item, 0);
        },
        noop,
        0
      );
    });

    it("completeCallback", function () {
      const arr = Array.from({ length: 12 }).fill(0);

      function handler(item, done) {
        done(item);
      }
      function completeCallback(items) {
        assert.equal(items.length, 12);
      }
      syncForEach(arr, handler, completeCallback, 0);
    });
  });

  it("should provide the items passed to doneCB() in itemHandler", function () {
    syncForEach(
      Array.from({ length: 12 }).fill(0),
      function handler(item, done) {
        done(item + 2);
      },
      function completeCallback(items) {
        items.map((item) => {
          assert.equal(item, 2);
        });
      },
      0
    );
  });
});
