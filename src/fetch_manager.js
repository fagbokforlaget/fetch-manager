const Queue = require('promise-queue');
const STATUS = require('./job_statuses');
var Job = require('./job');

export default class FetchManager {

  constructor(options) {
    if (options) {
      this.options = options;
    } else {
      this.options = {};
    }

    if (!this.options.concurency) {
      this.options.concurrency = 1;
    }
    if (!this.options.maxInQueue) {
      this.options.maxInQueue = Infinity;
    }
    if (!this.options.maxRetries) {
      this.options.maxRetries = 5;
    }

    this.queue = new Queue(this.options.concurrency, this.options.maxInQueue);
    this.activeQueue = [];
    this.failedQueue = [];
    this.doneQueue = [];
    this.lastJobId = 0;
  }

  add(url, opts = {}) {
    this.lastJobId += 1;
    let myOptions = {};

    if (opts) {
      myOptions = opts;
    }

    let job = new Job(this.lastJobId, url, myOptions, this.options.maxRetries);

    this.activeQueue.push(job);

    return this._push(job);
  }

  cancel(id) {
    return new Promise((resolve, reject) => {
      let job = null;

      this.activeQueue.forEach((j) => {
        if (j.is(id)) {
          job = j;
        }
      });

      if (job) {
        job.abort();
      }

      resolve();
      return true;
    });
  }

  getAllDownloads() {
    return this.activeQueue;
  }

  getStatus(id) {
    let status = STATUS.UNKNOWN;

    this.activeQueue.forEach((job) => {
      if (job.is(id)) {
        status = job.getStatus();
      }
    });
    if (status === STATUS.UNKNOWN) {
      this.failedQueue.forEach((job) => {
        if (job.is(id)) {
          status = job.getStatus();
        }
      });
    }
    if (status === STATUS.UNKNOWN) {
      this.doneQueue.forEach((job) => {
        if (job.is(id)) {
          status = job.getStatus();
        }
      });
    }
    return status;
  }

  _fail(job) {
    let thisJobIndex = this.activeQueue.indexOf(job);

    this.activeQueue.splice(thisJobIndex, 1);
    this.failedQueue.push(job);
  }

  _done(job) {
    let thisJobIndex = this.activeQueue.indexOf(job);

    this.doneQueue.push(job);
    this.activeQueue.splice(thisJobIndex, 1);
  }

  _push(job) {
    return this.queue.add(() => {
      let defferedJob = job.start();

      defferedJob.then(() => {
        this._done(job);
      }).catch(() => {
        this._fail(job);
      });
      return defferedJob;
    });
  }
}
