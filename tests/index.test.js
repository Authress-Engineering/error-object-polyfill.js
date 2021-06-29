const { describe, it } = require('mocha');
let { expect } = require('chai');
require('../index');

describe('index.js', () => {
  let thrownObject = { field: 'value' };
  const code = 'TEST_CODE';
  describe('ApplicationError Construction', () => {
    it('correctly captures object in error', () => {
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

    it('JSON.stringify works', () => {
      let error = new ApplicationError(thrownObject);
      let loggedError = JSON.parse(JSON.stringify(error));
      expect(loggedError.message).to.eql(error.message);
      expect(loggedError.stack).to.eql(error.stack);

      loggedError = JSON.parse(JSON.stringify({ error: error, thing: thrownObject }));
      expect(loggedError.thing).to.eql(thrownObject);
      expect(loggedError.error.message).to.eql(error.message);
      expect(loggedError.error.stack).to.eql(error.stack);
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

  describe('create()', () => {
    it('correctly captures object in Error', () => {
      let error = Error.create(thrownObject);
      expect(error.message).to.eql(thrownObject);
    });

    it('correctly captures object in Error()', () => {
      let error = Error().create(thrownObject);
      expect(error.message).to.eql(thrownObject);
    });

    it('correctly captures code in Error()', () => {
      let error = Error().create(thrownObject, code);
      expect(error.message).to.eql(thrownObject);
      expect(error.code).to.eql(code);
    });

    it('correctly captures object in new error', () => {
      let error = new Error().create(thrownObject);
      expect(error.message).to.eql(thrownObject);
    });

    it('It is an error', () => {
      expect(Error.create({})).to.be.instanceof(Error);
      expect(Error().create({})).to.be.instanceof(Error);
      expect(new Error().create({})).to.be.instanceof(Error);
    });

    it('PolyFill toString works', () => {
      let toString = Error.create({}).toString();
      expect(toString).to.equal('ErrorObjectPolyFill: {}');
    });

    it('ApplicationError works', () => {
      const error = new ApplicationError('Code');
      expect(error.message).to.equal('Code');
      expect(error.code).to.equal('Code');
    });

    it('JSON.stringify works', () => {
      let error = Error.create(thrownObject);
      let loggedError = JSON.parse(JSON.stringify(error));
      expect(loggedError.message).to.eql(error.message);
      expect(loggedError.stack).to.eql(error.stack);

      loggedError = JSON.parse(JSON.stringify({ error: error, thing: thrownObject }));
      expect(loggedError.thing).to.eql(thrownObject);
      expect(loggedError.error.message).to.eql(error.message);
      expect(loggedError.error.stack).to.eql(error.stack);
    });

    it('All versions are the same.', () => {
      let error = Error.create(thrownObject);
      expect(error.stack).to.not.eq(null);
      error.stack = {};
      let errorFunction = Error().create(thrownObject);
      expect(errorFunction.stack).to.not.eq(null);
      errorFunction.stack = {};
      let errorNew = new Error().create(thrownObject);
      expect(errorNew.stack).to.not.eq(null);
      errorNew.stack = {};

      expect(JSON.stringify(error)).to.eql(JSON.stringify(errorFunction));
      expect(JSON.stringify(error)).to.eql(JSON.stringify(errorNew));
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

//   describe('Overrides Error constructor', () => {
//     it('correctly captures object in error', () => {
//       let thrownObject = { field: 'value' };
//       let error = Error(thrownObject);
//       expect(error.message).to.eql(thrownObject);
//     });

//     // it('It is an error', () => {
//     //   expect(new Error({})).to.be.extend(Error);
//     // });

//     it('PolyFill toString works', () => {
//       let toString = new Error({}).toString();
//       expect(toString).to.equal('Error: {}');
//     });

//     it('callsite stack works', () => {
//       let limit = Error.stackTraceLimit;
//       let obj = {};
//       let prep = Error.prepareStackTrace;

//       Error.prepareStackTrace = (a, b) => b;
//       Error.stackTraceLimit = Math.max(10, limit);

//       // capture the stack
//       Error.captureStackTrace(obj);

//       // slice this function off the top
//       let stack = obj.stack.slice(1);

//       Error.prepareStackTrace = prep;
//       Error.stackTraceLimit = limit;

//       let callSite = stack[1];
//       callSite.getFileName();
//       callSite.getLineNumber();
//       callSite.getColumnNumber();
//     });
//   });
