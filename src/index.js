require('whatwg-fetch');
require('abortcontroller-polyfill/dist/polyfill-patch-fetch');
require('web-streams-polyfill');

import FetchManager from './fetch_manager';
export default FetchManager;

