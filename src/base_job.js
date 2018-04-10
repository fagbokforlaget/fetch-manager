const STATUS = require('./job_statuses');

export default class BaseJob {
  constructor(options) {
    this.options = options;
    this.retries = 0;
  }

  setup(id) {
    this.__id = id;
    this.status = STATUS.QUEUED;
    this.error = null;
  }

  addAbortController(controller) {
    this.abortController = controller;
  }

  start() {
    throw Error('start method is not implemented');
  }
}
