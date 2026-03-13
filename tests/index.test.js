// We must not need to import ApplicationError it must work by default
// const ApplicationError = require('../index');
require('../index');

describe('index.js', () => {
  const thrownObject = { field: 'value', code: 'BACKUP_CODE' };
  const code = 'TEST_CODE';
  describe('ApplicationError Construction', () => {
    it('correctly captures object in error', () => {
      const error = new ApplicationError(thrownObject);
      expect(error.message).toEqual(thrownObject);
    });

    it('It is an error', () => {
      expect(new ApplicationError({})).toBeInstanceOf(Error);
    });

    it('PolyFill toString works', () => {
      const toString = new ApplicationError({}).toString();
      expect(toString).toBe('(UnspecifiedApplicationErrorCode): {}');
    });

    it('JSON.stringify works', () => {
      const error = new ApplicationError(thrownObject);
      let loggedError = JSON.parse(JSON.stringify(error));
      expect(loggedError.message).toEqual(error.message);
      expect(loggedError.stack).toEqual(error.stack);

      loggedError = JSON.parse(JSON.stringify({ error: error, thing: thrownObject }));
      expect(loggedError.thing).toEqual(thrownObject);
      expect(loggedError.error.message).toEqual(error.message);
      expect(loggedError.error.stack).toEqual(error.stack);
    });

    it('callsite stack works', () => {
      const limit = Error.stackTraceLimit;
      const obj = {};
      const prep = Error.prepareStackTrace;

      Error.prepareStackTrace = (a, b) => b;
      Error.stackTraceLimit = Math.max(10, limit);

      // capture the stack
      Error.captureStackTrace(obj);

      // slice this function off the top
      const stack = obj.stack.slice(1);

      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;

      const callSite = stack[1];
      callSite.getFileName();
      callSite.getLineNumber();
      callSite.getColumnNumber();
    });
  });

  describe('create()', () => {
    it('correctly captures object in Error', () => {
      const error = new ApplicationError(thrownObject);
      expect(error.message).toEqual(thrownObject);
    });

    it('correctly captures object in Error()', () => {
      const error = new ApplicationError(thrownObject);
      expect(error.message).toEqual(thrownObject);
    });

    it('correctly captures code in Error()', () => {
      const error = new ApplicationError(thrownObject, code);
      expect(error.message).toEqual(thrownObject);
      expect(error.code).toEqual(code);
    });

    it('correctly captures object in new error', () => {
      const error = new ApplicationError(thrownObject);
      expect(error.message).toEqual(thrownObject);
    });

    it('It is an error', () => {
      expect(Error.create({})).toBeInstanceOf(Error);
      expect(ApplicationError({})).toBeInstanceOf(Error);
      expect(new ApplicationError({})).toBeInstanceOf(Error);
      expect(new Error().create({})).toBeInstanceOf(Error);
    });

    it('PolyFill toString works', () => {
      const toString = Error.create({}).toString();
      expect(toString).toBe('ErrorObjectPolyFill: {}');
    });

    it('ApplicationError works', () => {
      const error = new ApplicationError('Code');
      expect(error.message).toBe('Code');
      expect(error.code).toBe('Code');
    });

    it('ApplicationError works without new', () => {
      const error = ApplicationError('Code');
      expect(error.message).toBe('Code');
      expect(error.code).toBe('Code');
    });

    it('JSON.stringify works', () => {
      const error = Error.create(thrownObject);
      let loggedError = JSON.parse(JSON.stringify(error));
      expect(loggedError.message).toEqual(error.message);
      expect(loggedError.stack).toEqual(error.stack);

      loggedError = JSON.parse(JSON.stringify({ error: error, thing: thrownObject }));
      expect(loggedError.thing).toEqual(thrownObject);
      expect(loggedError.error.message).toEqual(error.message);
      expect(loggedError.error.stack).toEqual(error.stack);
    });

    it('All versions are the same.', () => {
      const error = Error.create(thrownObject);
      expect(error.stack).not.toBe(null);
      error.stack = {};

      const errorFunction = ApplicationError(thrownObject);
      expect(errorFunction.stack).not.toBe(null);
      errorFunction.stack = {};

      const errorNew = new ApplicationError(thrownObject);
      expect(errorNew.stack).not.toBe(null);
      errorNew.stack = {};

      expect(JSON.stringify(error)).toEqual(JSON.stringify(errorFunction));
      expect(JSON.stringify(error)).toEqual(JSON.stringify(errorNew));
    });

    it('callsite stack works', () => {
      const limit = Error.stackTraceLimit;
      const obj = {};
      const prep = Error.prepareStackTrace;

      Error.prepareStackTrace = (a, b) => b;
      Error.stackTraceLimit = Math.max(10, limit);

      // capture the stack
      Error.captureStackTrace(obj);

      // slice this function off the top
      const stack = obj.stack.slice(1);

      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;

      const callSite = stack[1];
      callSite.getFileName();
      callSite.getLineNumber();
      callSite.getColumnNumber();
    });
  });
});
