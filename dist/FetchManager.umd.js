(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FetchManager", [], factory);
	else if(typeof exports === 'object')
		exports["FetchManager"] = factory();
	else
		root["FetchManager"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  UNDEFINED: 'UNDEFINED',
  QUEUED: 'QUEUED',
  PENDING: 'PENDING',
  RETRY: 'RETRY',
  FINISHED: 'FINISHED',
  FAILURE: 'FAILURE',
  ABORTED: 'ABORTED'
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

__webpack_require__(4);

var _fetch_manager = __webpack_require__(5);

var _fetch_manager2 = _interopRequireDefault(_fetch_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _fetch_manager2.default;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Emitter = function () {
  function Emitter() {
    classCallCheck(this, Emitter);

    this.listeners = {};
  }

  createClass(Emitter, [{
    key: 'addEventListener',
    value: function addEventListener(type, callback) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, callback) {
      if (!(type in this.listeners)) {
        return;
      }
      var stack = this.listeners[type];
      for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      var _this = this;

      if (!(event.type in this.listeners)) {
        return;
      }
      var debounce = function debounce(callback) {
        setTimeout(function () {
          return callback.call(_this, event);
        });
      };
      var stack = this.listeners[event.type];
      for (var i = 0, l = stack.length; i < l; i++) {
        debounce(stack[i]);
      }
      return !event.defaultPrevented;
    }
  }]);
  return Emitter;
}();

var AbortSignal = function (_Emitter) {
  inherits(AbortSignal, _Emitter);

  function AbortSignal() {
    classCallCheck(this, AbortSignal);

    var _this2 = possibleConstructorReturn(this, (AbortSignal.__proto__ || Object.getPrototypeOf(AbortSignal)).call(this));

    _this2.aborted = false;
    _this2.onabort = null;
    return _this2;
  }

  createClass(AbortSignal, [{
    key: 'toString',
    value: function toString() {
      return '[object AbortSignal]';
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      if (event.type === 'abort') {
        this.aborted = true;
        if (typeof this.onabort === 'function') {
          this.onabort.call(this, event);
        }
      }

      get(AbortSignal.prototype.__proto__ || Object.getPrototypeOf(AbortSignal.prototype), 'dispatchEvent', this).call(this, event);
    }
  }]);
  return AbortSignal;
}(Emitter);

var AbortController = function () {
  function AbortController() {
    classCallCheck(this, AbortController);

    this.signal = new AbortSignal();
  }

  createClass(AbortController, [{
    key: 'abort',
    value: function abort() {
      var event = void 0;
      try {
        event = new Event('abort');
      } catch (e) {
        if (typeof document !== 'undefined') {
          // For Internet Explorer 11:
          event = document.createEvent('Event');
          event.initEvent('abort', false, false);
        } else {
          // Fallback where document isn't available:
          event = {
            type: 'abort',
            bubbles: false,
            cancelable: false
          };
        }
      }
      this.signal.dispatchEvent(event);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[object AbortController]';
    }
  }]);
  return AbortController;
}();

if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  // These are necessary to make sure that we get correct output for:
  // Object.prototype.toString.call(new AbortController())
  AbortController.prototype[Symbol.toStringTag] = 'AbortController';
  AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
}

/**
 * Note: the "fetch.Request" default value is available for fetch imported from
 * the "node-fetch" package and not in browsers. This is OK since browsers
 * will be importing umd-polyfill.js from that path "self" is passed the
 * decorator so the default value will not be used (because browsers that define
 * fetch also has Request). One quirky setup where self.fetch exists but
 * self.Request does not is when the "unfetch" minimal fetch polyfill is used
 * on top of IE11; for this case the browser will try to use the fetch.Request
 * default value which in turn will be undefined but then then "if (Request)"
 * will ensure that you get a patched fetch but still no Request (as expected).
 * @param {fetch, Request = fetch.Request}
 * @returns {fetch: abortableFetch, Request: AbortableRequest}
 */
function abortableFetchDecorator(patchTargets) {
  if ('function' === typeof patchTargets) {
    patchTargets = { fetch: patchTargets };
  }
  var _patchTargets = patchTargets,
      fetch = _patchTargets.fetch,
      _patchTargets$Request = _patchTargets.Request,
      NativeRequest = _patchTargets$Request === undefined ? fetch.Request : _patchTargets$Request,
      _patchTargets$AbortCo = _patchTargets.AbortController,
      NativeAbortController = _patchTargets$AbortCo === undefined ? AbortController : _patchTargets$AbortCo;


  var Request = NativeRequest;
  // Note that the "unfetch" minimal fetch polyfill defines fetch() without
  // defining window.Request, and this polyfill need to work on top of unfetch
  // so the below feature detection is wrapped in if (Request)
  if (Request) {
    // Do feature detecting
    var controller = new NativeAbortController();
    var signal = controller.signal;
    var request = new Request('/', { signal: signal });

    // Browser already supports abortable fetch (like FF v57 and fetch-polyfill)
    if (request.signal) {
      return { fetch: fetch, Request: Request };
    }

    Request = function Request(input, init) {
      var request = new NativeRequest(input, init);
      if (init && init.signal) {
        request.signal = init.signal;
      }
      return request;
    };
    Request.prototype = NativeRequest.prototype;
  }

  var realFetch = fetch;
  var abortableFetch = function abortableFetch(input, init) {
    var signal = Request && Request.prototype.isPrototypeOf(input) ? input.signal : init ? init.signal : undefined;

    if (signal) {
      var abortError = void 0;
      try {
        abortError = new DOMException('Aborted', 'AbortError');
      } catch (err) {
        // IE 11 does not support calling the DOMException constructor, use a
        // regular error object on it instead.
        abortError = new Error('Aborted');
        abortError.name = 'AbortError';
      }

      // Return early if already aborted, thus avoiding making an HTTP request
      if (signal.aborted) {
        return Promise.reject(abortError);
      }

      // Turn an event into a promise, reject it once `abort` is dispatched
      var cancellation = new Promise(function (_, reject) {
        signal.addEventListener('abort', function () {
          return reject(abortError);
        }, { once: true });
      });

      // Return the fastest promise (don't need to wait for request to finish)
      return Promise.race([cancellation, realFetch(input, init)]);
    }

    return realFetch(input, init);
  };

  return { fetch: abortableFetch, Request: Request };
}

(function (self) {

  if (self.AbortController) {
    return;
  }

  self.AbortController = AbortController;
  self.AbortSignal = AbortSignal;

  if (!self.fetch) {
    console.warn('fetch() is not available, cannot install abortcontroller-polyfill');
    return;
  }

  var _abortableFetch = abortableFetchDecorator(self),
      fetch = _abortableFetch.fetch,
      Request = _abortableFetch.Request;

  self.fetch = fetch;
  self.Request = Request;
})(typeof self !== 'undefined' ? self : global);

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = __webpack_require__(6);
var FetchJob = __webpack_require__(9);

var FetchManager = function () {
  function FetchManager(maxConcurrent) {
    _classCallCheck(this, FetchManager);

    this.queue = new Queue(maxConcurrent);
  }

  _createClass(FetchManager, [{
    key: 'add',
    value: function add(url, options) {
      return this.queue.add(new FetchJob({ url: url, options: options }));
    }
  }, {
    key: 'getAllDownloads',
    value: function getAllDownloads() {
      return this.queue.getActiveItems();
    }
  }, {
    key: 'cancel',
    value: function cancel(id) {
      return this.queue.abort(id);
    }
  }, {
    key: 'getStatus',
    value: function getStatus(id) {
      return this.queue.getStatus(id);
    }
  }]);

  return FetchManager;
}();

exports.default = FetchManager;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbortController = global.AbortController;
var STATUS = __webpack_require__(0);
var RETRIES_METHOD = __webpack_require__(7);
var AbortError = __webpack_require__(8);

var Queue = function () {
  function Queue(maxConcurrent) {
    _classCallCheck(this, Queue);

    this.pendingJobs = 0;
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.sequence = 0;
    this.maxRetries = 2;
    this.retryMethod = RETRIES_METHOD.SKIP_TO_END;
    this.currentJobs = [];
  }

  _createClass(Queue, [{
    key: 'add',
    value: function add(job) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!job.__id) {
          job.setup(++_this.sequence);
        }

        var abortController = new AbortController();

        job.addAbortController(abortController);

        var item = {
          job: job,
          promise: {
            controller: abortController,
            resolve: resolve,
            reject: reject
          }
        };

        item.job.status = STATUS.QUEUED;
        _this._push(item);
      });
    }
  }, {
    key: 'getActiveItems',
    value: function getActiveItems() {
      var res = [];

      if (this.currentJobs.length > 0) {
        this.currentJobs.forEach(function (item) {
          res.push(item.job);
        });
      }

      this.queue.forEach(function (item) {
        res.push(item.job);
      });
      return res;
    }
  }, {
    key: 'getItem',
    value: function getItem(id) {
      var res = void 0;

      if (this.currentJobs.length > 0) {
        this.currentJobs.forEach(function (item) {
          if (item.job.__id === id) {
            res = item;
          }
        });
        if (res) {
          return res;
        }
      }

      this.queue.forEach(function (item) {
        console.log(item, item.job.__id === id);
        if (item.job.__id === id) {
          res = item;
        }
      });
      return res;
    }
  }, {
    key: 'getStatus',
    value: function getStatus(id) {
      var item = this.getItem(id);

      if (item) {
        return item.job.status;
      }

      return STATUS.UNDEFINED;
    }
  }, {
    key: 'abort',
    value: function abort(id) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var item = _this2.getItem(id);

        console.log('abort -> ' + item.status);
        if (item && item.job.status === STATUS.PENDING) {
          item.job.status = STATUS.ABORTED;
          item.promise.controller.abort();
          resolve(true);
        } else if (item) {
          console.log('this is this item ' + item.job.__id);
          item.job.status = STATUS.ABORTED;
          _this2._removeJobFromQueue(item);
          item.promise.reject(new AbortError());
          resolve(true);
        } else {
          resolve(true);
        }
      });
    }
  }, {
    key: '_push',
    value: function _push(item) {
      this.queue.push(item);
      this._dequeue();
    }
  }, {
    key: '_dequeue',
    value: function _dequeue() {
      console.log('dequeue ' + this.pendingJobs + ' ' + this.maxConcurrent);
      if (this.pendingJobs >= this.maxConcurrent) {
        return false;
      }

      var item = this.queue.shift();

      if (!item) {
        return false;
      }

      this.currentJobs.push(item);

      this.pendingJobs++;

      item.job.status = STATUS.PENDING;

      this._resolveNow(item);

      return true;
    }
  }, {
    key: '_removeJobFromCurrent',
    value: function _removeJobFromCurrent(item) {
      var position = this.currentJobs.indexOf(item);

      this.currentJobs.splice(position, 1);
    }
  }, {
    key: '_removeJobFromQueue',
    value: function _removeJobFromQueue(item) {
      var position = this.queue.indexOf(item);

      console.log('remove from queue ');
      console.log(position);
      this.queue.splice(position, 1);
    }
  }, {
    key: '_resolveNow',
    value: function _resolveNow(item) {
      var _this3 = this;

      return Promise.resolve(item.job.start()).then(function (r) {
        console.log('queue ok ' + item.job.__id);
        _this3.pendingJobs--;
        item.job.status = STATUS.FINISHED;
        _this3._removeJobFromCurrent(item);
        _this3._dequeue();
        item.promise.resolve(r);
      }).catch(function (e) {
        if (item.job.status === STATUS.ABORTED || item.job.retries >= _this3.maxRetries) {
          console.log('queue fail ' + item.job.__id);
          _this3.pendingJobs--;
          item.job.status = STATUS.FAILURE;
          item.job.error = e;
          item.promise.reject(e);
          _this3._removeJobFromCurrent(item);
          _this3._dequeue();
        } else {
          item.job.retries++;
          if (_this3.retryMethod === RETRIES_METHOD.SKIP_TO_END) {
            console.log('queue push to end ' + item.job.__id);
            item.job.status = STATUS.RETRY;
            _this3.pendingJobs--;
            _this3._removeJobFromCurrent(item);
            _this3._push(item);
          } else {
            console.log('queue again ' + item.job.__id);
            return _this3._resolveNow(item);
          }
        }
      });
    }
  }]);

  return Queue;
}();

exports.default = Queue;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  IMMEDIATELY: 0,
  SKIP_TO_END: 1
};
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbortError = function (_Error) {
  _inherits(AbortError, _Error);

  function AbortError(response) {
    _classCallCheck(this, AbortError);

    var _this = _possibleConstructorReturn(this, (AbortError.__proto__ || Object.getPrototypeOf(AbortError)).call(this, 'Action aborted'));

    _this.name = 'AbortError';
    _this.message = 'Action aborted';
    _this.stack = new Error().stack;
    return _this;
  }

  return AbortError;
}(Error);

exports.default = AbortError;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseJob = __webpack_require__(10);
var ResponseError = __webpack_require__(11);
var STATUS = __webpack_require__(0);

var FetchJob = function (_BaseJob) {
  _inherits(FetchJob, _BaseJob);

  function FetchJob(options) {
    _classCallCheck(this, FetchJob);

    var _this = _possibleConstructorReturn(this, (FetchJob.__proto__ || Object.getPrototypeOf(FetchJob)).call(this, options));

    _this.progress = 0;
    _this.size = 0;
    _this.listener = null;
    return _this;
  }

  _createClass(FetchJob, [{
    key: 'consume',
    value: function consume(reader, totalLength) {
      var total = 0;
      var self = this;

      return new Promise(function (resolve, reject) {
        var stream = new ReadableStream({
          start: function start(controller) {
            function push() {
              reader.read().then(function (_ref) {
                var done = _ref.done,
                    value = _ref.value;

                if (done) {
                  controller.close();
                  return;
                }
                total += value.byteLength;
                self._setProgress(total, totalLength);
                controller.enqueue(value);
                push();
              });
            }
            push();
          }
        });

        resolve(new Response(stream, { headers: { 'Content-Type': 'text/html' } }));
      });
    }
  }, {
    key: '_setProgress',
    value: function _setProgress(size, totalLength) {
      this.size = size;
      this.progress = size / totalLength * 100;
      if (this.listener) {
        this.listener(this.size, totalLength, this.progress);
      }
    }
  }, {
    key: 'setProgressListener',
    value: function setProgressListener(listener) {
      this.listener = listener;
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var fetchOpts = _this2.options.options;

        fetchOpts.signal = _this2.abortController.signal;

        var promise = fetch(_this2.options.url, fetchOpts);

        if (_this2.status === STATUS.ABORTED) {
          _this2.abortController.abort();
        }

        promise.then(function (response) {
          console.log(1);
          console.log(response);
          if (response.status < 200 || response.status > 299) {
            throw new ResponseError(response);
          }
          return response;
        }).then(function (response) {
          console.log(2);
          console.log(response);
          if (response.body) {
            // both: response and progress for browsers that supports this feature
            resolve(_this2.consume(response.body.getReader(), response.headers.get('Content-Length')));
          } else {
            // no progress updates
            if (response.headers.get('Content-Type').match(/application\/json/) || response.headers.get('Content-Type').match(/text/)) {
              resolve(response);
            } else {
              response.blob().then(function (resp) {
                resolve(resp);
              });
            }
          }
        }).catch(function (error) {
          reject(error);
        });

        return promise;
      });
    }
  }]);

  return FetchJob;
}(BaseJob);

exports.default = FetchJob;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATUS = __webpack_require__(0);

var BaseJob = function () {
  function BaseJob(options) {
    _classCallCheck(this, BaseJob);

    this.options = options;
    this.retries = 0;
  }

  _createClass(BaseJob, [{
    key: 'setup',
    value: function setup(id) {
      this.__id = id;
      this.status = STATUS.QUEUED;
      this.error = null;
    }
  }, {
    key: 'addAbortController',
    value: function addAbortController(controller) {
      this.abortController = controller;
    }
  }, {
    key: 'start',
    value: function start() {
      throw Error('start method is not implemented');
    }
  }]);

  return BaseJob;
}();

exports.default = BaseJob;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponseError = function (_Error) {
  _inherits(ResponseError, _Error);

  function ResponseError(response) {
    _classCallCheck(this, ResponseError);

    var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, response.statusText));

    _this.name = 'ResponseError';
    _this.message = response.statusText;
    _this.response = response;
    _this.stack = new Error().stack;
    return _this;
  }

  return ResponseError;
}(Error);

exports.default = ResponseError;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=FetchManager.umd.js.map