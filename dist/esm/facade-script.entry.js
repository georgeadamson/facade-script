import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-5b415241.js';

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
// When a script must only ever be loaded isOnce, we use this to track whether it's on the page already.
// Note that it is a map so we can track different script src urls.
const globalStatusCode = {};
const PengScript = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pengscript = createEvent(this, "pengscript", 7);
    /** Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. */
    this.isOnce = false;
    /** By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead. */
    this.isGlobal = false;
    /** Specify when the script will be added to the page. Default is to lazy load. */
    this.trigger = 'lazy';
    /** Delay n milliseconds after being triggered. */
    this.wait = 0;
    /** Fine tune when an iframe will be shown. Defaults to wait until is has loaded. */
    this.showWhen = 'LOADED';
    /** To expose status message for debugging etc: */
    this.statusMessage = STATUS_NAME[STATUS.IDLE];
    // Local script load state:
    this.status = 0;
    // This is called when we decide to load the script:
    this.onTrigger = () => {
      const { isGlobal, isIframe, wait, src, props, onLoad, timeout } = this;
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
      if (this.isOnce && isScriptOnPage(src)) {
        if (statusOfGlobalScript(src) < STATUS.LOADING) {
          globalStatusCode[src] = STATUS.LOADING;
        }
        this.status = statusOfGlobalScript(src);
        return;
      }
      // Prepare an init to run now or after wait:
      const initScriptLoad = () => {
        // Add script to the <head> if not already running:
        if (isGlobal &&
          // this.status < STATUS.LOADING &&
          !(this.isOnce && isScriptOnPage(src))) {
          createElement(isIframe ? 'iframe' : 'script', Object.assign({ src, onload: onLoad }, parseJSON(props)), document.head);
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
    this.onLoad = () => {
      if (this.status !== STATUS.TIMEOUT) {
        const { src, isOnce, isReady, timeout, timeoutId } = this;
        clearTimeout(timeoutId);
        if (isOnce)
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
    this.errorMessage = ERROR_MESSAGE[code];
  }
  // EMIT EVENT whenever status changes:
  onStatus(code, oldCode) {
    if (code === oldCode)
      return;
    const { wait, error, errorMessage, isOnce, src, timeoutId, host } = this;
    const detail = {
      code,
      status: STATUS_NAME[code],
      wait,
      timeoutId,
      src
    };
    console.info('PengScript:', JSON.stringify(detail));
    if (timeoutId && code >= STATUS.READY) {
      clearTimeout(timeoutId);
    }
    // Update global status too, if script should only render once on page:
    if (isOnce && code >= STATUS.LOADING && code > statusOfGlobalScript(src)) {
      globalStatusCode[src] = code;
    }
    const errorDetail = { status: STATUS_NAME[code], code, error, errorMessage, id: host.id, src };
    this.statusMessage = STATUS_NAME[code];
    this.pengscript.emit(errorDetail);
  }
  componentWillLoad() {
    // Decide which src to use in the current environment: (Feature for future use)
    this.src = this.srcProd;
  }
  componentDidLoad() {
    const { trigger, onTrigger, src, host } = this;
    let handler;
    // Do we need to do anything immediately?
    switch (true) {
      // Trigger immediately:
      case trigger === 'now': {
        handler = onTrigger;
        break;
      }
      // Trigger when this component is scrolled into view:
      case trigger === 'lazy': {
        handler = () => newIntersectionObserver(onTrigger).observe(host);
        break;
      }
      // When a custom external trigger function has been specified:
      case typeof trigger === 'function': {
        handler = trigger;
        break;
      }
    }
    // Initialise the handler:
    if (handler) {
      handler(onTrigger);
    }
    // Detect whether script tag is already in the page:
    if (this.isOnce && isScriptOnPage(src)) {
      if (statusOfGlobalScript(src) < STATUS.LOADING) {
        globalStatusCode[src] = STATUS.LOADING;
      }
      this.status = statusOfGlobalScript(src);
    }
  }
  render() {
    const { isIframe, src, isGlobal, props, trigger, onLoad, showWhen, status, statusMessage, isOnce, } = this;
    let script;
    // Decide when to swap out default placeholder when script loads:
    const showWhenStatus = STATUS[String(showWhen).toUpperCase()] || STATUS.LOADED;
    // Do we want to render a script tag yet?
    if (!isGlobal && status > STATUS.WAITING && !(isOnce && isScriptOnPage(src))) {
      const Tag = isIframe ? 'iframe' : 'script';
      const scriptProps = Object.assign({ src, onLoad }, parseJSON(props));
      script = h(Tag, Object.assign({}, scriptProps));
    }
    // Bind a click handler to the host element if necessary:
    const hostProps = {
      onClick: trigger === 'click' && this.onTrigger,
    };
    // Decide whether to show either the placeholder or the result of the script:
    const hidePlaceholder = status >= showWhenStatus && status !== STATUS.TIMEOUT;
    return (h(Host, Object.assign({}, hostProps), h("div", { "data-script-status": statusMessage, class: "facade-placeholder-content", hidden: hidePlaceholder }, h("slot", null)), h("div", { "data-script-status": statusMessage, class: "facade-scripted-content", hidden: !hidePlaceholder }, script)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "error": ["onError"],
    "status": ["onStatus"]
  }; }
};
// Return true if script is already present or loading on page:
function isScriptOnPage(src) {
  return statusOfGlobalScript(src) >= STATUS.TRIGGERED ||
    Boolean(document.querySelector(`script[src^="${src}"]`));
}
// Helper to parse JSON from attribute string if necessary:
function parseJSON(json) {
  try {
    return (typeof json === 'object' ? json : (json && JSON.parse(json))) || {};
  }
  catch (err) {
    console.error('Error parsing props JSON', err, 'JSON:', json);
    return undefined;
  }
}
// Helper to create an element with attributes and append it to a DOM element:
function createElement(tag, props = {}, appendTo) {
  const el = document.createElement(tag);
  Object.keys(props).forEach((key) => {
    let value = props[key];
    // Set prop directly if it exists or if value is a function:
    // Note: This will need to be enhanced for other complex types such as Dates.
    el.hasOwnProperty(key) ||
      (typeof value === 'function') ||
      (value = ((typeof value === 'object' && toJSON(value)) || value)) ?
      el[key] = value :
      el.setAttribute(key, value);
  });
  if (appendTo)
    appendTo.appendChild(el);
  // Helper silently to convert value to JSON without throwing errors:
  function toJSON(value) {
    try {
      return JSON.stringify(value);
    }
    catch (err) {
      return undefined;
    }
  }
}
function statusOfGlobalScript(src) {
  return globalStatusCode[src] || STATUS.IDLE;
}
function newIntersectionObserver(callback) {
  return new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      callback();
    }
  });
}
async function awaitScriptReady(test, timeout, interval = 200) {
  return new Promise((resolve, reject) => {
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
    // Define a timeout too: (Recommended)
    if (parseInt(timeout)) {
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        reject('timeout');
      }, parseInt(timeout));
    }
  });
}

export { PengScript as facade_script };
