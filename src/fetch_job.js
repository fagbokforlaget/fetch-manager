const BaseJob = require('./base_job');
const ResponseError = require('./response_error');
const STATUS = require('./job_statuses');

export default class FetchJob extends BaseJob {
  constructor(options) {
    super(options);
    this.progress = 0;
    this.size = 0;
    this.listener = null;
  }

  consume(reader, totalLength) {
    let total = 0;
    let self = this;

    return new Promise((resolve) => {
      const stream = new ReadableStream({
        start(controller) {
          var push = function() {
            reader.read().then(({done, value}) => {
              if (done) {
                controller.close();
                return;
              }
              total += value.byteLength;
              self._setProgress(total, totalLength);
              controller.enqueue(value);
              push();
            });
          };

          push();
        }
      });

      resolve(new Response(stream, {'headers': {'Content-Type': 'text/html'}}));
    });
  }

  _setProgress(size, totalLength) {
    this.size = size;
    this.progress = size / totalLength * 100;
    if (this.listener) {
      this.listener(this.size, totalLength, this.progress);
    }
  }

  setProgressListener(listener) {
    this.listener = listener;
  }

  start() {
    return new Promise((resolve, reject) => {
      let fetchOpts = this.options.options;

      fetchOpts.signal = this.abortController.signal;

      let promise = fetch(this.options.url, fetchOpts);

      if (this.status === STATUS.ABORTED) {
        this.abortController.abort();
      }

      promise.then((response) => {
          if (response.status < 200 || response.status > 299) {
            throw new ResponseError(response);
          }
          return response;
        }).then((response) => {
          if (response.body) {
            // Both: response and progress for browsers that supports this feature
            resolve(this.consume(response.body.getReader(), response.headers.get('Content-Length')));
          } else {
            // No progress updates
            let contentType = response.headers.get('Content-Type');

            if (contentType.match(/application\/json/) || contentType.match(/text/)) {
              resolve(response);
            } else {
              response.blob().then((resp) => {
                resolve(resp);
              });
            }
          }
        })
        .catch((error) => {
          reject(error);
        });

      return promise;
    });
  }
}
