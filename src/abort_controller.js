let CustomAbortController = global.AbortController;

class FakeAbortController {
  constructor() {
    this.signal = {};
  }
  abort() {
    return true;
  }
}

if (!CustomAbortController) {
  CustomAbortController = FakeAbortController;
}

export default CustomAbortController;
