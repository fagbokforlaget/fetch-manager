import chai from 'chai';
import Queue from '../src/queue.js';
import BaseJob from '../src/base_job';

chai.expect();

const expect = chai.expect;
let queue;

class FakeJob extends BaseJob {
	constructor(options) {
		super(options);
	}

	start() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if(this.options.shouldNotFail) resolve(this.options.value);
				else reject(this.options.value)
			}, 100)
		})
	}
}

describe('Given an instance of Queue', function () {
  before(function () {
    queue = new Queue(1,2);
  });

  describe('it sets valid instance', function () {
    it('should set concurrency', () => {
      expect(queue.maxConcurrent).to.be.equal(1);
    });

    it('should set maxRetries', () => {
    	expect(queue.maxRetries).to.be.equal(2);
    });
  });

  describe('adding jobs', () => {
  	it('should add job to the queue and resolve it correctly', (done) => {
  		queue.add(new FakeJob({value: 1, shouldNotFail: true})).then((r) => {
  			expect(r).to.be.equal(1);
  			done()
  		});
  	});

  	it('should resolve jobs concurrently', (done) => {
  		let arr = []
  		queue.add(new FakeJob({value: 1, shouldNotFail: true})).then((r) => {
  			arr.push(r);
  			expect(r).to.be.equal(1);
  		});
  		queue.add(new FakeJob({value: 2, shouldNotFail: true})).then((r) => {
  			arr.push(r);
  			expect(r).to.be.equal(2);
  		});
  		queue.add(new FakeJob({value: 3, shouldNotFail: true})).then((r) => {
  			arr.push(r);
  			expect(r).to.be.equal(3);
  			expect(arr[0]).to.be.equal(1)
  			expect(arr[1]).to.be.equal(2)
  			expect(arr[2]).to.be.equal(3)
  			done()
  		});
  	});

  	it('should retry failing jobs', (done) => {
  		let job = new FakeJob({value: 1, shouldNotFail: false})
  		queue.add(job).then((r) => {
  		}).catch((e) => {
  			expect(job.retries).to.be.equal(queue.maxRetries);
  			done()
  		});
  	});
  });
});
