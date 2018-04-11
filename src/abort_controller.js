let AbortController = global.AbortController;

class FakeAbortController {
  constructor() {
    this.signal = {};
  }
  abort() {
    return true;
  }
}

if (!AbortController) {
  AbortController = FakeAbortController;
}

export default AbortController;
