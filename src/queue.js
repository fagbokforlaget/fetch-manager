import AbortController from './abort_controller';
import STATUS from './job_statuses';
import RETRIES_METHOD from './retries_methods';
import AbortError from './abort_error';

export default class Queue {
  constructor(maxConcurrent, maxRetries) {
    this.pendingJobs = 0;
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.sequence = 0;
    this.maxRetries = maxRetries;
    this.retryMethod = RETRIES_METHOD.SKIP_TO_END;
    this.currentJobs = [];
    this.finishedJobs = [];
  }

  add(task) {
    return new Promise((res, rej) => {
      if (!task.__id) {
        this.sequence += 1;
        task.setup(this.sequence);
      }

      const abortController = new AbortController();

      task.addAbortController(abortController);

      let item = {
        'job': task,
        'promise': {
          'controller': abortController,
          'reject': rej,
          'resolve': res
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

    if (this.finishedJobs.length > 0) {
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
      let status = {'status': item.job.status};

      if (item.job.status === STATUS.PENDING && item.job.progress) {
        status.progress = item.job.progress;
      }

      return status;
    }

    return undefined;
  }

  abort(id) {
    return new Promise((resolve) => {
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

    this.pendingJobs += 1;

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
        this.pendingJobs -= 1;
        this._removeJobFromCurrent(item);
        item.job.status = STATUS.FINISHED;
        this._dequeue();
        this.finishedJobs.push(item);
        item.promise.resolve(r);
      })
      .catch((e) => {
        if (item.job.status === STATUS.ABORTED || item.job.retries >= this.maxRetries) {
          this.pendingJobs -= 1;
          this._removeJobFromCurrent(item);
          item.job.status = STATUS.FAILURE;
          item.job.error = e;
          item.promise.reject(e);
          this._dequeue();
        } else {
          item.job.retries += 1;
          if (this.retryMethod === RETRIES_METHOD.SKIP_TO_END) {
            this._removeJobFromCurrent(item);
            item.job.status = STATUS.RETRY;
            this.pendingJobs -= 1;
            this._push(item);
          } else {
            this._resolveNow(item);
          }
        }
      });
  }
}
