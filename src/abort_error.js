export default class AbortError extends Error {
  constructor() {
    super('The operation was aborted.');
    this.name = 'AbortError';
    this.message = 'The operation was aborted.';
    this.stack = new Error().stack;
  }
}
