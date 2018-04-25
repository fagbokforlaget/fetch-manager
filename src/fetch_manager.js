const Queue = require('./queue');
const FetchJob = require('./fetch_job');

export default class FetchManager {
  constructor(maxConcurrentJobs, maxRetries) {
    let mcj = 5;
    let mr = 5;

    if (typeof maxConcurrentJobs === 'number') {
      mcj = maxConcurrentJobs;
    }

    if (typeof maxRetries === 'number') {
      mr = maxRetries;
    }

    this.queue = new Queue(mcj, mr);
  }

  add(optUrl, optParams) {
    return this.queue.add(new FetchJob({
        'options': optParams,
        'url': optUrl
      }));
  }

  createJob(optUrl, optParams) {
    return new FetchJob({
        'options': optParams,
        'url': optUrl
      });
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
