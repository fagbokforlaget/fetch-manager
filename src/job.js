const STATUS = require('./job_statuses');
const AbortController = global.AbortController;

export default class Job {
  constructor(id, url, options, maxRetries) {
    this.id = id;
    this.url = url;
    this.options = options;
    this.status = STATUS.PENDING;
    this.retry = 0;
    this.maxRetries = maxRetries;
    this.controller = null;
    this.shouldAbort = false;
    this.error = null;
  }

  is(id) {
    return this.id === id;
  }

  getOptions() {
    let options = this.options;

    this.controller = new AbortController();
    options.signal = this.controller.signal;
    return options;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
    // console.debug(this.toString());
  }

  toString() {
    return 'JOB id(' + this.id + ') status(' + this.status.name + ')';
  }

  fetch() {
    if (this.status === STATUS.QUEUED || this.status === STATUS.RETRY) {
      let promise = fetch(this.url, this.getOptions());

      if (this.shouldAbort) {
        this.controller.abort();
        this.shouldAbort = false;
      } else {
        this.setStatus(STATUS.DOWNLOADING);
      }

      return promise;
    }
    return null;
  }

  setIsDone() {
    this.setStatus(STATUS.DOWNLOADED);
  }

  setFailure(error) {
    this.setStatus(STATUS.ERROR);
    this.error = error;
  }

  canRetry() {
    this.retry += 1;
    if (this.retry < this.maxRetries) {
      this.setStatus(STATUS.RETRY);
      return true;
    }

    this.setStatus(STATUS.ERROR);
    return false;
  }

  abort() {
    this.setAborted();
    if (this.controller) {
      this.controller.abort();
    } else {
      this.shouldAbort = true;
    }
    return true;
    // return new Promise((resolve, reject) => {
    //   this.setAborted();
    //   if (this.controller) {
    //     console.log('has controller');
    //     this.controller.abort();
    //     console.log('resolvinf');
    //     return resolve();
    //   }
    //   console.log('resolving anyway');
    //   this.shouldAbort = true;
    //   return true;
    // });
  }

  setAborted() {
    this.setStatus(STATUS.ABORTED);
  }

  start() {
    this.setStatus(STATUS.QUEUED);
    return new Promise((resolve, reject) => {
      let promise = this.fetch();

      promise.then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          this.setIsDone();
          return resolve(resp);
        }

        if (this.canRetry()) {
          return this.start();
        }

        this.setFailure(Error('Max retries reached. Response status: ' + resp.status));
        return reject(resp);
      }).catch((error) => {
        if (error.name === 'AbortError') {
          this.setAborted();
          return reject(error);
        }
        this.setFailure(error);
        return reject(error);
      });
    });
  }
}
