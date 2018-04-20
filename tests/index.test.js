let { describe, it } = require('mocha');
let { expect } = require('chai');
require('../index');

describe('index.js', () => {
  describe('Syntax', () => {
    it('correctly captures object in error', () => {
      let thrownObject = { field: 'value' };
      let error = new ApplicationError(thrownObject);
      expect(error.message).to.eql(thrownObject);
    });

    it('It is an error', () => {
      expect(new ApplicationError({})).to.be.instanceof(Error);
    });

    it('PolyFill toString works', () => {
      let toString = new ApplicationError({}).toString();
      expect(toString).to.equal('ApplicationError: {}');
    });

    it('callsite stack works', () => {
      let limit = Error.stackTraceLimit;
      let obj = {};
      let prep = Error.prepareStackTrace;

      Error.prepareStackTrace = (a, b) => b;
      Error.stackTraceLimit = Math.max(10, limit);
    
      // capture the stack
      Error.captureStackTrace(obj);
    
      // slice this function off the top
      let stack = obj.stack.slice(1);
    
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
    
      let callSite = stack[1];
      callSite.getFileName();
      callSite.getLineNumber();
      callSite.getColumnNumber();
    });
  });
});
