!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("FetchManager",[],e):"object"==typeof exports?exports.FetchManager=e():t.FetchManager=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={UNDEFINED:"UNDEFINED",QUEUED:"QUEUED",PENDING:"DOWNLOADING",RETRY:"RETRY",FINISHED:"DOWNLOADED",FAILURE:"FAILURE",ABORTED:"ABORTED"},t.exports=e.default},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),r(3),r(4);var n=r(5),o=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=o.default,t.exports=e.default},function(t,e){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function n(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return v.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function s(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function u(t){var e=new FileReader,r=s(e);return e.readAsArrayBuffer(t),r}function a(t){var e=new FileReader,r=s(e);return e.readAsText(t),r}function f(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(v.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(v.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(v.arrayBuffer&&v.blob&&w(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!v.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!_(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},v.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(f(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},v.formData&&(this.formData=function(){return this.text().then(d)}),this.json=function(){return this.text().then(JSON.parse)},this}function h(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}function p(t,e){e=e||{};var r=e.body;if(t instanceof p){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=h(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function d(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split(/\r?\n/).forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e}function b(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var v={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(v.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},_=ArrayBuffer.isView||function(t){return t&&m.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,n){t=e(t),n=r(n);var o=this.map[t];this.map[t]=o?o+","+n:n},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,n){this.map[e(t)]=r(n)},o.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),n(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),n(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),n(t)},v.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},l.call(p.prototype),l.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var E=[301,302,303,307,308];b.redirect=function(t,e){if(-1===E.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=p,t.Response=b,t.fetch=function(t,e){return new Promise(function(r,n){var o=new p(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new b(e,t))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&v.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},function(t,e,r){(function(t){!function(t,e){e()}(0,function(){"use strict";function e(t){"function"==typeof t&&(t={fetch:t});var e=t,r=e.fetch,n=e.Request,o=void 0===n?r.Request:n,i=e.AbortController,s=void 0===i?f:i,u=o;if(u){var a=new s,c=a.signal;if(new u("/",{signal:c}).signal)return{fetch:r,Request:u};u=function(t,e){var r=new o(t,e);return e&&e.signal&&(r.signal=e.signal),r},u.prototype=o.prototype}var l=r;return{fetch:function(t,e){var r=u&&u.prototype.isPrototypeOf(t)?t.signal:e?e.signal:void 0;if(r){var n=void 0;try{n=new DOMException("Aborted","AbortError")}catch(t){n=new Error("Aborted"),n.name="AbortError"}if(r.aborted)return Promise.reject(n);var o=new Promise(function(t,e){r.addEventListener("abort",function(){return e(n)},{once:!0})});return Promise.race([o,l(t,e)])}return l(t,e)},Request:u}}var r=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=function t(e,r,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,r);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,r,n)}if("value"in o)return o.value;var s=o.get;if(void 0!==s)return s.call(n)},i=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},s=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},u=function(){function t(){r(this,t),this.listeners={}}return n(t,[{key:"addEventListener",value:function(t,e){t in this.listeners||(this.listeners[t]=[]),this.listeners[t].push(e)}},{key:"removeEventListener",value:function(t,e){if(t in this.listeners)for(var r=this.listeners[t],n=0,o=r.length;n<o;n++)if(r[n]===e)return void r.splice(n,1)}},{key:"dispatchEvent",value:function(t){var e=this;if(t.type in this.listeners){for(var r=this.listeners[t.type],n=0,o=r.length;n<o;n++)!function(r){setTimeout(function(){return r.call(e,t)})}(r[n]);return!t.defaultPrevented}}}]),t}(),a=function(t){function e(){r(this,e);var t=s(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.aborted=!1,t.onabort=null,t}return i(e,t),n(e,[{key:"toString",value:function(){return"[object AbortSignal]"}},{key:"dispatchEvent",value:function(t){"abort"===t.type&&(this.aborted=!0,"function"==typeof this.onabort&&this.onabort.call(this,t)),o(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"dispatchEvent",this).call(this,t)}}]),e}(u),f=function(){function t(){r(this,t),this.signal=new a}return n(t,[{key:"abort",value:function(){var t=void 0;try{t=new Event("abort")}catch(e){"undefined"!=typeof document?(t=document.createEvent("Event"),t.initEvent("abort",!1,!1)):t={type:"abort",bubbles:!1,cancelable:!1}}this.signal.dispatchEvent(t)}},{key:"toString",value:function(){return"[object AbortController]"}}]),t}();"undefined"!=typeof Symbol&&Symbol.toStringTag&&(f.prototype[Symbol.toStringTag]="AbortController",a.prototype[Symbol.toStringTag]="AbortSignal"),function(t){if(!t.AbortController){if(t.AbortController=f,t.AbortSignal=a,!t.fetch)return void console.warn("fetch() is not available, cannot install abortcontroller-polyfill");var r=e(t),n=r.fetch,o=r.Request;t.fetch=n,t.Request=o}}("undefined"!=typeof self?self:t)})}).call(e,r(1))},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(6),s=r(9),u=function(){function t(e,r){n(this,t);var o="number"==typeof e?e:5,s="number"==typeof r?r:5;this.queue=new i(o,s)}return o(t,[{key:"add",value:function(t,e){return this.queue.add(new s({url:t,options:e}))}},{key:"getAllDownloads",value:function(){return this.queue.getActiveItems()}},{key:"cancel",value:function(t){return this.queue.abort(t)}},{key:"getStatus",value:function(t){return this.queue.getStatus(t)}}]),t}();e.default=u,t.exports=e.default},function(t,e,r){"use strict";(function(n){function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=n.AbortController,u=r(0),a=r(7),f=r(8),c=function(){function t(e,r){o(this,t),this.pendingJobs=0,this.maxConcurrent=e,this.queue=[],this.sequence=0,this.maxRetries=r,this.retryMethod=a.SKIP_TO_END,this.currentJobs=[],this.finishedJobs=[]}return i(t,[{key:"add",value:function(t){var e=this;return new Promise(function(r,n){t.__id||t.setup(++e.sequence);var o=new s;t.addAbortController(o);var i={job:t,promise:{controller:o,resolve:r,reject:n}};i.job.status=u.QUEUED,e._push(i)})}},{key:"getActiveItems",value:function(){var t=[];return this.currentJobs.length>0&&this.currentJobs.forEach(function(e){t.push(e.job)}),this.queue.forEach(function(e){t.push(e.job)}),t}},{key:"getItem",value:function(t){var e=void 0;return this.currentJobs.length>0&&(this.currentJobs.forEach(function(r){r.job.__id===t&&(e=r)}),e)?e:this.queue.length>0&&(this.queue.forEach(function(r){r.job.__id===t&&(e=r)}),e)?e:(this.finishedJobs.length>0&&this.finishedJobs.forEach(function(r){r.job.__id===t&&(e=r)}),e)}},{key:"getStatus",value:function(t){var e=this.getItem(t);if(e){var r={status:e.job.status};return e.job.status===u.PENDING&&e.job.progress&&(r.progress=e.job.progress),r}}},{key:"abort",value:function(t){var e=this;return new Promise(function(r,n){var o=e.getItem(t);o&&o.job.status===u.PENDING?(o.job.status=u.ABORTED,o.promise.controller.abort(),r(!0)):o?(o.job.status=u.ABORTED,e._removeJobFromQueue(o),o.promise.reject(new f),r(!0)):r(!0)})}},{key:"_push",value:function(t){this.queue.push(t),this._dequeue()}},{key:"_dequeue",value:function(){if(this.pendingJobs>=this.maxConcurrent)return!1;var t=this.queue.shift();return!!t&&(this.currentJobs.push(t),this.pendingJobs++,t.job.status=u.PENDING,this._resolveNow(t),!0)}},{key:"_removeJobFromCurrent",value:function(t){var e=this.currentJobs.indexOf(t);this.currentJobs.splice(e,1)}},{key:"_removeJobFromQueue",value:function(t){var e=this.queue.indexOf(t);this.queue.splice(e,1)}},{key:"_resolveNow",value:function(t){var e=this;return Promise.resolve(t.job.start()).then(function(r){e.pendingJobs--,e._removeJobFromCurrent(t),t.job.status=u.FINISHED,e._dequeue(),e.finishedJobs.push(t),t.promise.resolve(r)}).catch(function(r){if(t.job.status===u.ABORTED||t.job.retries>=e.maxRetries)e.pendingJobs--,e._removeJobFromCurrent(t),t.job.status=u.FAILURE,t.job.error=r,t.promise.reject(r),e._dequeue();else{if(t.job.retries++,e.retryMethod!==a.SKIP_TO_END)return e._resolveNow(t);e._removeJobFromCurrent(t),t.job.status=u.RETRY,e.pendingJobs--,e._push(t)}})}}]),t}();e.default=c,t.exports=e.default}).call(e,r(1))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={IMMEDIATELY:0,SKIP_TO_END:1},t.exports=e.default},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(t){n(this,e);var r=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"The operation was aborted."));return r.name="AbortError",r.message="The operation was aborted.",r.stack=(new Error).stack,r}return i(e,t),e}(Error);e.default=s,t.exports=e.default},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=r(10),a=r(11),f=r(0),c=function(t){function e(t){n(this,e);var r=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return r.progress=0,r.size=0,r.listener=null,r}return i(e,t),s(e,[{key:"consume",value:function(t,e){var r=0,n=this;return new Promise(function(o,i){var s=new ReadableStream({start:function(o){function i(){t.read().then(function(t){var s=t.done,u=t.value;if(s)return void o.close();r+=u.byteLength,n._setProgress(r,e),o.enqueue(u),i()})}i()}});o(new Response(s,{headers:{"Content-Type":"text/html"}}))})}},{key:"_setProgress",value:function(t,e){this.size=t,this.progress=t/e*100,this.listener&&this.listener(this.size,e,this.progress)}},{key:"setProgressListener",value:function(t){this.listener=t}},{key:"start",value:function(){var t=this;return new Promise(function(e,r){var n=t.options.options;n.signal=t.abortController.signal;var o=fetch(t.options.url,n);return t.status===f.ABORTED&&t.abortController.abort(),o.then(function(t){if(t.status<200||t.status>299)throw new a(t);return t}).then(function(r){r.body?e(t.consume(r.body.getReader(),r.headers.get("Content-Length"))):r.headers.get("Content-Type").match(/application\/json/)||r.headers.get("Content-Type").match(/text/)?e(r):r.blob().then(function(t){e(t)})}).catch(function(t){r(t)}),o})}}]),e}(u);e.default=c,t.exports=e.default},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),s=function(){function t(e){n(this,t),this.options=e,this.retries=0}return o(t,[{key:"setup",value:function(t){this.__id=t,this.status=i.QUEUED,this.error=null}},{key:"addAbortController",value:function(t){this.abortController=t}},{key:"start",value:function(){throw Error("start method is not implemented")}}]),t}();e.default=s,t.exports=e.default},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(t){n(this,e);var r=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.statusText));return r.name="ResponseError",r.message=t.statusText,r.response=t,r.stack=(new Error).stack,r}return i(e,t),e}(Error);e.default=s,t.exports=e.default}])});
//# sourceMappingURL=FetchManager.umd.js.map