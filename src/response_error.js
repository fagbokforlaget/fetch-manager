export default class ResponseError extends Error {
  constructor(response) {
    super(response.statusText);
    this.name = 'ResponseError';
    this.message = response.statusText;
    this.response = response;
    this.stack = new Error().stack;
  }
}
