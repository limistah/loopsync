# Sync Loop

A Module to loop through an array synchronously

## Installation

```
npm install loopsync --save
// or
yarn add loopsync
```

## Basic usage

```
const loopsync = require("loopsync");

const arr = Array.from({ length: 12 }).fill(0);

function handler(item, done) {
    done(item);
}
function completeCallback(items) {
    assert.equal(items.length, 12);
}

loopsync(arr, handler, completeCallback);
```

## Docs

The default export for this module is a function that accepts three arguments

- **array**: _Array_ The first argument is the array to be looped through
- **handlerFunction**: _Function_ A function to handle all the items in the array. It also receives three arguments
  - **item**: The current item in the array for the current index
  - **doneCallback**: A callback function to indicate the current process is complete. Must be called to move to the next item.
    This **doneCallback(itemProcessingValue)** can be passed a value to collect all the values returned after processing each item
  - **currentItemIndex**: The index of the current item passed to the **handlerFunction**
- **completeCallback**: This is a function that depicts the whole items have been processed. It receives an array of all the return values passed when calling the **doneCallback** function of every item.

## Credits

Built with 💘💘💘 by [Aleem Isiaka](aleemisiaka.com)
