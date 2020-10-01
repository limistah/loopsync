/**
 * This function synchronously loops through an array by taking an array of items and a handler function to handle each item of the array which also receives a processDone function to transition to the next item in the array.
 *
 *
 * @param {array} array The array to loop through
 * @param {function} handler A function that receives each element of the array
 * @param {function} done A function that is executed once the array items have been exhausted and received the return value
 * @param {number} index A number where the loop should start from
 */
function syncForEach(array = [], handler, completeCallback, index = 0) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }

  if (typeof handler !== "function") {
    throw new Error("Second argument(Handler) must be a function");
  }

  if (completeCallback && typeof completeCallback !== "function") {
    throw new Error("Third argument(completeCallback) must be a function");
  }

  if (index && typeof index !== "number") {
    throw new Error("Fourth argument(currentIndex) must be a number");
  }

  syncForEach.returns =
    syncForEach.returns || Array.from({ length: array.length }).fill(null);
  if (index >= 0 && array.length >= index + 1) {
    handler(
      array[index],
      function processDoneCB(retValue) {
        syncForEach.returns[index] = retValue;
        syncForEach(array, handler, completeCallback, index + 1);
      },
      index
    );
  } else {
    completeCallback(syncForEach.returns);
  }
}

module.exports = syncForEach;
