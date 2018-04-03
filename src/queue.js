const AbortController = global.AbortController;
const STATUS = require('./job_statuses');
const RETRIES_METHOD = require('./retries_methods');
const AbortError = require('./abort_error');

export default class Queue {
  constructor(maxConcurrent) {
    this.pendingJobs = 0;
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.sequence = 0;
    this.maxRetries = 2;
    this.retryMethod = RETRIES_METHOD.SKIP_TO_END;
    this.currentJobs = [];
    this.finishedJobs = [];
  }

  add(job) {
    return new Promise((resolve, reject) => {
      if (!job.__id) {
        job.setup(++this.sequence);
      }

      let abortController = new AbortController();

      job.addAbortController(abortController);

      let item = {
        job: job,
        promise: {
          controller: abortController,
          resolve: resolve,
          reject: reject
        }
      };

      item.job.status = STATUS.QUEUED;
      this._push(item);
    });
  }

  getActiveItems() {
    let res = [];

    if (this.currentJobs.length > 0) {
      this.currentJobs.forEach((item) => {
        res.push(item.job);
      });
    }

    this.queue.forEach((item) => {
      res.push(item.job);
    });
    return res;
  }

  getItem(id) {
    let res;

    if (this.currentJobs.length > 0) {
      this.currentJobs.forEach((item) => {
        if (item.job.__id === id) {
          res = item;
        }
      });
      if (res) {
        return res;
      }
    }

    if (this.queue.length > 0) {
      this.queue.forEach((item) => {
        if (item.job.__id === id) {
          res = item;
        }
      });
      if (res) {
        return res;
      }
    }

    if(this.finishedJobs.length > 0) {
      this.finishedJobs.forEach((item) => {
        if (item.job.__id === id) {
          res = item;
        }
      });
    }

    return res;
  }

  getStatus(id) {
    let item = this.getItem(id);

    if (item) {
      return item.job.status;
    }

    return STATUS.UNDEFINED;
  }

  abort(id) {
    return new Promise((resolve, reject) => {
      let item = this.getItem(id);

      if (item && item.job.status === STATUS.PENDING) {
        item.job.status = STATUS.ABORTED;
        item.promise.controller.abort();
        resolve(true);
      } else if (item) {
        item.job.status = STATUS.ABORTED;
        this._removeJobFromQueue(item);
        item.promise.reject(new AbortError());
        resolve(true);
      } else {
        resolve(true);
      }
    });
  }

  _push(item) {
    this.queue.push(item);
    this._dequeue();
  }

  _dequeue() {
    if (this.pendingJobs >= this.maxConcurrent) {
      return false;
    }

    let item = this.queue.shift();

    if (!item) {
      return false;
    }

    this.currentJobs.push(item);

    this.pendingJobs++;

    item.job.status = STATUS.PENDING;

    this._resolveNow(item);

    return true;
  }

  _removeJobFromCurrent(item) {
    let position = this.currentJobs.indexOf(item);

    this.currentJobs.splice(position, 1);
  }

  _removeJobFromQueue(item) {
    let position = this.queue.indexOf(item);

    this.queue.splice(position, 1);
  }

  _resolveNow(item) {
    return Promise.resolve(item.job.start())
      .then((r) => {
        this.pendingJobs--;
        this._removeJobFromCurrent(item);
        item.job.status = STATUS.FINISHED;
        this._dequeue();
        this.finishedJobs.push(item);
        item.promise.resolve(r);
      })
      .catch((e) => {
        if (item.job.status === STATUS.ABORTED || item.job.retries >= this.maxRetries) {
          this.pendingJobs--;
          this._removeJobFromCurrent(item);
          item.job.status = STATUS.FAILURE;
          item.job.error = e;
          item.promise.reject(e);
          this._dequeue();
        } else {
          item.job.retries++;
          if (this.retryMethod === RETRIES_METHOD.SKIP_TO_END) {
            this._removeJobFromCurrent(item);
            item.job.status = STATUS.RETRY;
            this.pendingJobs--;
            this._push(item);
          } else {
            return this._resolveNow(item);
          }
        }
      });
  }
}
