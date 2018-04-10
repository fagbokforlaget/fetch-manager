import chai from 'chai';
import BaseJob from '../src/base_job.js';

chai.expect();

const expect = chai.expect;
let bj;

describe('Given an instance of BaseJob', function () {
  before(function () {
    bj = new BaseJob({});
  });
  describe('it should be defined', function () {
    it('should have retries', () => {
      expect(bj.retries).to.be.equal(0);
    });
  });
});

describe('BaseJob should be extendable', function() {
  before(function() {
    class BJ extends BaseJob {
      constructor(options) {
        super(options)
      }
    }

    bj = new BJ();
  })
  describe('it should be defined', function () {
    it('should have retries', () => {
      expect(bj.retries).to.be.equal(0);
    });

    it('should throw an exception when start is not defined', () => {
      expect(bj.start).to.throw("start method is not implemented");
    });

    it('should define __id', () => {
      bj.setup(123);
      expect(bj.__id).to.be.equal(123);
    });

  });
});
