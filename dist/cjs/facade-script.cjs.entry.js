'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6be36c99.js');

// Experiment to reduce code size: (Safe to remove these 3 lines)
const clearTimeout = window.clearTimeout;
const clearInterval = window.clearInterval;
const parseInt = window.parseInt;
const SCRIPT_UID_ATTR = 'data-facadescriptid';
const ERROR_MESSAGE = {
  1: 'Script triggered but missing src',
};
// Global script load states:
// Typically a script is considered global when it is added to <head> instead of inlining in this component)
const STATUS = {
  IDLE: 0,
  TRIGGERED_BUT_NO_SRC: 0.1,
  TRIGGERED: 2,
  WAITING: 3,
  LOADING: 4,
  LOADED: 5,
  READY: 6,
  TIMEOUT: 7,
};
// Derive a reverse lookup to tell us the status name for a given code:
// We've used a for loop because it is faster than the ES6 functional equivalent.
// const STATUS_NAME = Object.assign({}, ...Object.keys(STATUS).map((key) => ({ [STATUS[key]]: key })))
const STATUS_NAME = {};
for (const key in STATUS)
  STATUS_NAME[STATUS[key]] = key;
// Global script load state: (Shared by all instances of <facade-script>)
// When a script must only ever be loaded once, we use this to track whether it's on the page already.
// Note that it is a map so we can track different script src urls.
const globalStatusCode = {};
let nextUid = 0;
const FacadeScript = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.facadescript = index.createEvent(this, "facadescript", 7);
    /** Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. */
    this.once = false;
    /** By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead. */
    this.global = false;
    /** Specify when the script will be added to the page. Default is to lazy load. */
    this.trigger = 'lazy';
    /** Delay n milliseconds after being triggered. */
    this.wait = 0;
    /** Fine tune when an iframe will be shown. Defaults to wait until is has loaded. */
    this.showWhen = 'LOADED';
    /** Readonly: Expose the current status for debugging or as a hook for a CSS selector: */
    this.statusMsg = 'IDLE';
    // Local script load state:
    this.status = 0;
    // A unique identifier for each instance of this Custom Element.
    // We use this to identify the script or iframe rendered in the DOM. 
    this.uid = nextUid++;
    // Return true if script is already present on the page:
    this.isOnPage = () => {
      const { src, uid } = this;
      const selector = `[src^="${src}"]:not([${SCRIPT_UID_ATTR}=${uid}])`;
      return (
      // statusOfGlobalScript(src) >= STATUS.TRIGGERED ||
      Boolean(document.querySelector(`script${selector},iframe${selector}`)));
    };
    // This is called when we decide to load the script:
    this.onTrigger = () => {
      const { once, global, iframe, wait, src, uid, props, onLoad, timeout } = this;
      // Update status (and thereby emit event to inform any listeners)
      this.status = STATUS.TRIGGERED;
      if (!src) {
        this.error = 1;
        this.status = STATUS.IDLE;
        return;
      }
      else if (this.error) {
        this.error = undefined;
      }
      // Bail out now if already loading:
      if (once && this.isOnPage()) {
        if (statusOfGlobalScript(src) < STATUS.LOADING) {
          globalStatusCode[src] = STATUS.LOADING;
        }
        this.status = statusOfGlobalScript(src);
        return;
      }
      // Prepare an init to run now or after wait:
      const initScriptLoad = () => {
        //
        if (once && this.isOnPage()) {
          this.status = globalStatusCode[src] || (globalStatusCode[src] = STATUS.READY);
          return;
        }
        // Add script to the <head> if not already running:
        if (global &&
          // this.status < STATUS.LOADING &&
          !(once && this.isOnPage())) {
          createElement(iframe ? 'iframe' : 'script', Object.assign({ src, [SCRIPT_UID_ATTR]: uid, onLoad }, parseJSON(props)), document.head);
        }
        else {
          // Otherwise the render method will render the script or iframe because status >= TRIGGERED
        }
        // Update status:
        this.status = globalStatusCode[src] = STATUS.LOADING;
        // Set a timeout timer if necessary:
        if (timeout) {
          this.timeoutId = setTimeout(() => {
            if (this.status < STATUS.READY) {
              (this.status = STATUS.TIMEOUT);
            }
          }, timeout);
        }
      };
      // Append script to page, but wait first if specified:
      if (wait) {
        this.status = STATUS.WAITING;
        setTimeout(initScriptLoad, wait);
      }
      else {
        initScriptLoad();
      }
    };
    // Handler triggered by the load event of the script or iframe:
    this.onLoad = () => {
      if (this.status !== STATUS.TIMEOUT) {
        const { src, once, isReady, timeout, timeoutId } = this;
        clearTimeout(timeoutId);
        if (once)
          globalStatusCode[src] = STATUS.LOADED;
        this.status = STATUS.LOADED;
        awaitScriptReady(isReady || (() => true), timeout)
          .then(() => (this.status = STATUS.READY))
          .catch((err) => console.error('awaitScriptReady', err));
      }
    };
  }
  // Update error attribute whenever error happens:
  onError(code) {
    this.errMsg = ERROR_MESSAGE[code];
  }
  // EMIT EVENT whenever status changes:
  onStatus(code, oldCode) {
    if (code === oldCode)
      return;
    const { debug, error, errMsg, once, src, timeoutId, host } = this;
    if (timeoutId && code >= STATUS.READY) {
      clearTimeout(timeoutId);
    }
    // Update global status too, if script should only render once on page:
    if (once && code >= STATUS.LOADING && code > statusOfGlobalScript(src)) {
      globalStatusCode[src] = code;
    }
    const errorDetail = { code, status: STATUS_NAME[code], error, errMsg, id: host.id, src };
    this.statusMsg = STATUS_NAME[code];
    this.facadescript.emit(errorDetail);
    if (debug) {
      const { uid, iframe, global } = this;
      console.debug('facadescript:', Object.assign(Object.assign({}, errorDetail), { uid, iframe, once, global }));
    }
  }
  componentWillLoad() {
    // Decide which src to use in the current environment: (Feature for future use)
    this.src = this.srcProd;
  }
  componentDidLoad() {
    const { trigger, once, onTrigger, src, host } = this;
    // Do we need to do anything immediately?
    const handler = trigger === 'now' ?
      onTrigger :
      trigger === 'lazy' ?
        () => newIntersectionObserver(onTrigger).observe(host) :
        typeof trigger === 'function' ?
          trigger :
          false;
    // Initialise the handler:
    if (handler) {
      handler(onTrigger);
    }
    // Detect whether script tag is already in the page:
    if (once && this.isOnPage()) {
      if (statusOfGlobalScript(src) < STATUS.LOADING) {
        globalStatusCode[src] = STATUS.LOADING;
      }
      this.status = statusOfGlobalScript(src);
    }
  }
  render() {
    const { iframe, src, uid, global, props, trigger, onTrigger, onLoad, showWhen, status, once, } = this;
    let script;
    // Decide when to swap out default placeholder when script loads:
    const showWhenStatus = STATUS[String(showWhen).toUpperCase()] || STATUS.LOADED;
    // Should the iframe (or script) remain hidden?
    const hidden = status < showWhenStatus;
    // Do we want to render a script tag yet?
    if (!global && status > STATUS.WAITING && !(once && this.isOnPage())) {
      const Tag = iframe ? 'iframe' : 'script';
      const scriptProps = Object.assign({ src,
        onLoad,
        hidden, [SCRIPT_UID_ATTR]: uid }, parseJSON(props));
      script = index.h(Tag, Object.assign({}, scriptProps));
    }
    // Bind a click handler to the host element if necessary:
    const hostProps = {
      onClick: trigger === 'click' && status < STATUS.TRIGGERED && onTrigger,
    };
    // Decide whether to show either the placeholder or the result of the script:
    const hidePlaceholder = !hidden && status !== STATUS.TIMEOUT;
    return (index.h(index.Host, Object.assign({}, hostProps), index.h("div", { class: "facade-script-placeholder", hidden: hidePlaceholder }, index.h("slot", null)), script));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "error": ["onError"],
    "status": ["onStatus"]
  }; }
};
// Helper to parse JSON from attribute string if necessary:
function parseJSON(json) {
  try {
    return (typeof json === 'object' ? json : (json && JSON.parse(json))) || {};
  }
  catch (err) {
    console.error('Error parsing `props`', err, 'JSON:', json);
    // return undefined;
  }
}
// Helper to create an element with attributes and append it to a DOM element:
function createElement(tag, props = {}, appendTo) {
  let json;
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    // Set prop directly if it exists or if value is a function:
    // Note: This will need to be enhanced for other complex types such as Dates.
    el.hasOwnProperty(key) ||
      (typeof value === 'function')
      // Put this feature on ice until needed:
      // || (typeof value === 'object' && (json = toJSON(value)) && (value = json))
      ?
        el[key] = value :
      el.setAttribute(key, value);
  });
  if (appendTo)
    appendTo.appendChild(el);
  // Helper to silently onvert value to JSON without throwing errors:
  // const toJSON = (value) => {
  //   try {
  //     return JSON.stringify(value);
  //   } catch (err) {
  //     // return undefined;
  //   }
  // }
}
const statusOfGlobalScript = (src) => (globalStatusCode[src] || STATUS.IDLE);
const newIntersectionObserver = (callback) => new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    observer.disconnect();
    callback();
  }
});
const awaitScriptReady = async (test, timeout, interval = 200) => new Promise((resolve, reject) => {
  let timeoutId;
  // Run the test every n milliseconds to find out whether the script is ready:
  const intervalId = setInterval(() => {
    if (test()) {
      // Clear timers and let the calling code know the script is ready to run:
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      resolve();
    }
  }, parseInt(interval) || 200);
  // Apply a timeout too: (Recommended)
  if (timeout) {
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject('timeout');
    }, parseInt(timeout) || 30000);
  }
});

exports.facade_script = FacadeScript;
