let { describe, it } = require('mocha');
let { expect } = require('chai');

describe('index.js', () => {
  describe('Syntax', () => {
    it('correctly captures object in error', () => {
      let thrownObject = {};

      let error = new Error(thrownObject);
      expect(error.message).to.equal('[object Object]');
      
      require('../index.js');

      error = new Error(thrownObject);
      expect(error.message).to.eql(thrownObject);
    });
  });
});
