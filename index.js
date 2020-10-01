/**
 * This function synchronously loops through an array by taking an array of items and a handler function to handle each item of the array which also receives a processDone function to transition to the next item in the array.
 *
 *
 * @param {array} array The array to loop through
 * @param {function} handler A function that receives each element of the array
 * @param {function} done A function that is executed once the array items have been exhausted and received the return value
 * @param {number} currentIndex A number where the loop should start from
 */
function syncForEach(array = [], handler, completeCallback, currentIndex = 0) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }

  if (typeof handler !== "function") {
    throw new Error("Second argument(Handler) must be a function");
  }

  if (completeCallback && typeof completeCallback !== "function") {
    throw new Error("Third argument(completeCallback) must be a function");
  }

  if (currentIndex && typeof currentIndex !== "number") {
    throw new Error("Fourth argument(currentcurrentIndex) must be a number");
  }

  syncForEach.returns =
    syncForEach.returns || Array.from({ length: array.length }).fill(null);
  if (currentIndex >= 0 && array.length >= currentIndex + 1) {
    handler(
      array[currentIndex],
      function processDoneCB(retValue) {
        syncForEach.returns[currentIndex] = retValue;
        syncForEach(array, handler, completeCallback, currentIndex + 1);
      },
      currentIndex
    );
  } else {
    completeCallback(syncForEach.returns);
  }
}

module.exports = syncForEach;
