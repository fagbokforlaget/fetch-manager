const Queue = require('./queue');
const FetchJob = require('./fetch_job');

export default class FetchManager {
  constructor(maxConcurrentJobs, maxRetries) {
    let mcj = typeof maxConcurrentJobs === 'number' ? maxConcurrentJobs : 5;
    let mr = typeof maxRetries === 'number' ? maxRetries : 5;

    this.queue = new Queue(mcj, mr);
  }

  add(url, options) {
    return this.queue.add(new FetchJob({url: url, options: options}));
  }

  createJob(url, options) {
    return new FetchJob({url: url, options: options});
  }

  addJobToQueue(job) {
    return this.queue.add(job);
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
