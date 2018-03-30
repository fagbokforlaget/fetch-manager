import chai from 'chai';
import FetchManager from '../src/index.js';

chai.expect();

const expect = chai.expect;
let fm;

describe('Given an instance of FetchManager', function () {
  before(function () {
    fm = new FetchManager({});
  });
  describe('it works', function () {
    it('should return false', () => {
      expect(false).to.be.equal(false);
    });
  });
});
