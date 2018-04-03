const Queue = require('./queue');
const FetchJob = require('./fetch_job');

export default class FetchManager {
  constructor(maxConcurrent) {
    this.queue = new Queue(maxConcurrent);
  }

  add(url, options) {
    return this.queue.add(new FetchJob({url: url, options: options}));
  }

  getAllDownloads() {
    return this.queue.getActiveItems();
  }

  cancel(id) {
    return this.queue.abort(id);
  }

  getStatus(id) {
    return this.queue.getStatus(id);
  }
}
