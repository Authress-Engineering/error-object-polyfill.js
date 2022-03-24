
## One day this will work
```js

let originalError = Error;
class ErrorObjectPolyFill extends Error {
  constructor(...args) {
    super(...args);
    originalError.captureStackTrace(this, this.constructor);
    this.message = args[0];
  }

  static captureStackTrace(...args) {
    let orig = originalError.prepareStackTrace;
    originalError.prepareStackTrace = (_, stack) => stack;
    let err = new originalError();
    originalError.captureStackTrace(err, ErrorObjectPolyFill.captureStackTrace);
    let stack = err.stack;
    originalError.prepareStackTrace = orig;
    args[0].stack = stack;
  }

  toString() {
    return this.message ? `ErrorObjectPolyFill: ${this.message.toString()}` : 'ErrorObjectPolyFill';
  }

  get [Symbol.toStringTag]() {
    return 'ErrorObjectPolyFill';
  }
}

/* eslint-disable no-global-assign */
Error = ErrorObjectPolyFill;
Error.prototype = ErrorObjectPolyFill;
Error.prototype.constructor = ErrorObjectPolyFill.prototype;
Object.setPrototypeOf(Error.prototype, ErrorObjectPolyFill);

```

OR This, so we can support `new Error`

```js
let originalError = Error;
function ErrorObjectPolyFill(...args) {
  if (!(this instanceof ErrorObjectPolyFill)) {
    return new ErrorObjectPolyFill(...args);
  }

  originalError.captureStackTrace(this, this.constructor);
  this.message = args[0];

  this.toString = function() {
    return 'aoeaeaoea';
  };
  // get [Symbol.toStringTag]() {
  //   return 'ErrorObjectPolyFill';
  // }
}

/* eslint-disable no-global-assign */
Error = ErrorObjectPolyFill;
Error.captureStackTrace = function(...captureArgs) {
  let orig = originalError.prepareStackTrace;
  originalError.prepareStackTrace = (_, stack) => stack;
  let err = new originalError();
  originalError.captureStackTrace(err, ErrorObjectPolyFill.captureStackTrace);
  let stack = err.stack;
  originalError.prepareStackTrace = orig;
  captureArgs[0].stack = stack;
};

Error.prototype = ErrorObjectPolyFill;
Error.prototype.constructor = ErrorObjectPolyFill.prototype;
Object.setPrototypeOf(Error.prototype, ErrorObjectPolyFill);

```
