/*
  Throw error objects
  Copyright (C) 2018 Warren Parad

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

let originalError = Error;
class ApplicationError extends Error {
  constructor(message, rawCode, ...args) {
    const code = rawCode || typeof message === 'string' && message || typeof message === 'object' && message.code || null;

    const codeString = `(${code || 'UnspecifiedApplicationErrorCode'})`;
    const stringErrorMessage = `${codeString}: ${JSON.stringify(message || '')}`;
    super(stringErrorMessage, ...args);

    if (typeof originalError.captureStackTrace !== 'undefined') {
      originalError.captureStackTrace(this, this.constructor);
    }

    this.message = message;
    this.code = code;
  }

  get [Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    const codeString = `(${this.code || 'UnspecifiedApplicationErrorCode'})`;
    return `${codeString}: ${JSON.stringify(this.message || '')}`;
  }

  toJSON() {
    let map = {};
    Object.getOwnPropertyNames(this).forEach(key => {
      map[key] = this[key];
    });
    return map;
  }
}

const originalApplicationErrorClass = ApplicationError;
const ApplicationErrorWrapper = function(...args) { return new originalApplicationErrorClass(...args); };
if (typeof global !== 'undefined') {
  global.ApplicationError = ApplicationErrorWrapper;
}
module.exports = ApplicationErrorWrapper;

/* eslint-disable no-extend-native */
Error.create = function(errorObject, code) {
  if (!(this instanceof Error)) {
    let error = new Error().create(errorObject, code);
    if (typeof Error.captureStackTrace !== 'undefined') {
      Error.captureStackTrace(error, Error.create);
    }
    return error;
  }
  this.message = errorObject;
  this.code = code || typeof errorObject === 'string' && errorObject || typeof errorObject === 'object' && errorObject.code || null;
  return this;
};
Error.prototype.create = Error.create;
Error.prototype.toString = function() {
  const codeString = this.code ? ` (${this.code})` : '';
  return this.message ? `ErrorObjectPolyFill${codeString}: ${JSON.stringify(this.message)}` : 'ErrorObjectPolyFill';
};
Error.prototype.inspect = Error.prototype.toString;
Error.prototype.toJSON = function() {
  let map = {};
  Object.getOwnPropertyNames(this).forEach(key => {
    map[key] = this[key];
  });
  return map;
};
