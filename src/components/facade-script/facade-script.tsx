import {
  Component,
  Prop,
  State,
  Watch,
  Host,
  Element,
  Event,
  EventEmitter,
  h,
} from '@stencil/core';

export type PengScriptStatusCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0.1;
export type PengScriptStatusName =
  | 'IDLE'
  | 'TRIGGERED_BUT_NO_SRC'
  | 'TRIGGERED'
  | 'WAITING'
  | 'LOADING'
  | 'LOADED'
  | 'READY'
  | 'TIMEOUT';

export type PengScriptEvent = {
  code: PengScriptStatusCode;
  status: PengScriptStatusName;
  error?: PengScriptErrorCode;
  errMsg?: string;
  iframe?: boolean;
  once?: boolean;
  id?: string;
  src: string;
}

// Experiment to reduce code size: (Safe to remove these 3 lines)
const clearTimeout = window.clearTimeout;
const clearInterval = window.clearInterval;
const parseInt = window.parseInt;

const SCRIPT_UID_ATTR = 'data-facadescriptid';

// Messages for handled errors:
export type PengScriptErrorCode = 1;
const ERROR_MESSAGE = {
  1: 'Script triggered but missing src',
};

// Global script load states:
// Typically a script is considered global when it is added to <head> instead of inlining in this component)
const STATUS: { [key: string]: PengScriptStatusCode } = {
  IDLE: 0,
  TRIGGERED_BUT_NO_SRC: 0.1,
  TRIGGERED: 2,
  WAITING: 3,
  LOADING: 4, // This also tells us the <script> has need rendered
  LOADED: 5,
  READY: 6,
  TIMEOUT: 7,
};

// Derive a reverse lookup to tell us the status name for a given code:
// We've used a for loop because it is faster than the ES6 functional equivalent.
// const STATUS_NAME = Object.assign({}, ...Object.keys(STATUS).map((key) => ({ [STATUS[key]]: key })))
const STATUS_NAME = {};
for (const key in STATUS) STATUS_NAME[STATUS[key]] = key;

// Global script load state: (Shared by all instances of <facade-script>)
// When a script must only ever be loaded once, we use this to track whether it's on the page already.
// Note that it is a map so we can track different script src urls.
const globalStatusCode: { [src: string]: PengScriptStatusCode } = {};

let nextUid: number = 0;

@Component({
  tag: 'facade-script'
})
export class FacadeScript {
  /** Required. src for the `<script>` or `<iframe>` that will be added to the DOM when lazyload is triggered. */
  @Prop({ attribute: 'src' }) srcProd!: string;

  // The src is required. The rest are options:

  /** By default a script tag will be rendered. Use this option to render an iframe instead. */
  @Prop() iframe?: boolean;

  /** Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. */
  @Prop() once?: boolean = false;

  /** By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead. */
  @Prop() global?: boolean = false;

  /** Specify when the script will be added to the page. Default is to lazy load. */
  @Prop() trigger?: 'now' | 'lazy' | 'click' | Function = 'lazy';

  /** Delay n milliseconds after being triggered. */
  @Prop() wait?: number = 0;

  /** Optional props to set on the script or iframe. Map of key:values supplied as object or JSON. */
  @Prop() props?: string | object;

  /** Fine tune when an iframe will be shown. Defaults to wait until is has loaded. */
  @Prop() showWhen?: PengScriptStatusName = 'LOADED';

  /** Milliseconds to wait before discarding a slow loading script or iframe. */
  @Prop() timeout?: number;

  /** A function that will return true when your script has loaded an run. For example to detect `'myVideoPlayer' in window`. Without this we assume the script is ready for use as soon as it loads. */
  @Prop({ attribute: 'ready' }) isReady?: Function;

  /** Readonly. Exposes any error message for debugging or as a hook for a CSS selector: */
  @Prop({ reflect: true, attribute: 'error' }) errMsg?: string;

  /** Readonly: Expose the current status for debugging or as a hook for a CSS selector: */
  @Prop({ reflect: true, attribute: 'status' }) statusMsg?: PengScriptStatusName = 'IDLE';

  /** Optionally output debug info to the console whenever the component changes state */
  @Prop() debug?: boolean;

  // This is an internal reference to this Custom Element. Needed for IntersectionObserver.
  @Element() private host: HTMLElement;

  // Local script load state:
  @State() private status: PengScriptStatusCode = 0;
  @State() private error: PengScriptErrorCode; // undefined is equivalent to 0

  // Update error attribute whenever error happens:
  @Watch('error')
  onError(code: PengScriptErrorCode) {
    this.errMsg = ERROR_MESSAGE[code];
  }

  // EMIT EVENT whenever status changes:
  @Watch('status')
  onStatus(code: PengScriptStatusCode, oldCode: PengScriptStatusCode) {
    if (code === oldCode) return;

    const { debug, error, errMsg, once, src, timeoutId, host } = this;

    if (timeoutId && code >= STATUS.READY) {
      clearTimeout(timeoutId);
    }

    // Update global status too, if script should only render once on page:
    if (once && code >= STATUS.LOADING && code > statusOfGlobalScript(src)) {
      globalStatusCode[src] = code;
    }

    const errorDetail: PengScriptEvent = { code, status: STATUS_NAME[code], error, errMsg, id: host.id, src };
    this.statusMsg = STATUS_NAME[code];
    this.facadescript.emit(errorDetail);

    if (debug) {
      const { uid, iframe, global } = this;
      console.debug('facadescript:', { ...errorDetail, uid, iframe, once, global });
    }
  }

  // Define custom event. Will be fired whenever status changes:
  @Event({ bubbles: true, cancelable: true }) facadescript: EventEmitter<PengScriptEvent>;

  // The desired script src:
  private src: string;

  // A unique identifier for each instance of this Custom Element.
  // We use this to identify the script or iframe rendered in the DOM. 
  private uid: number = nextUid++;

  // Id of timer used to handle script load timeout:
  private timeoutId: NodeJS.Timeout;

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

  // Return true if script is already present on the page:
  private isOnPage = () => {
    const { src, uid } = this;
    const selector = `[src^="${src}"]:not([${SCRIPT_UID_ATTR}=${uid}])`;

    return (
      // statusOfGlobalScript(src) >= STATUS.TRIGGERED ||
      Boolean(document.querySelector(`script${selector},iframe${selector}`))
    );
  }

  // This is called when we decide to load the script:
  private onTrigger = () => {
    const { once, global, iframe, wait, src, uid, props, onLoad, timeout } = this;

    // Update status (and thereby emit event to inform any listeners)
    this.status = STATUS.TRIGGERED;

    if (!src) {
      this.error = 1;
      this.status = STATUS.IDLE;
      return;
    } else if (this.error) {
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
      if (
        global &&
        // this.status < STATUS.LOADING &&
        !(once && this.isOnPage())
      ) {
        createElement(
          iframe ? 'iframe' : 'script',
          { src, [SCRIPT_UID_ATTR]: uid, onLoad, ...parseJSON(props) },
          document.head
        );
      } else {
        // Otherwise the render method will render the script or iframe because status >= TRIGGERED
      }

      // Update status:
      this.status = globalStatusCode[src] = STATUS.LOADING;

      // Set a timeout timer if necessary:
      if (timeout) {
        this.timeoutId = setTimeout(
          () => {
            if (this.status < STATUS.READY) {
              (this.status = STATUS.TIMEOUT)
            }
          },
          timeout
        );
      }
    };

    // Append script to page, but wait first if specified:
    if (wait) {
      this.status = STATUS.WAITING;
      setTimeout(initScriptLoad, wait);
    } else {
      initScriptLoad();
    }
  };

  // Handler triggered by the load event of the script or iframe:
  private onLoad = () => {
    if (this.status !== STATUS.TIMEOUT) {
      const { src, once, isReady, timeout, timeoutId } = this;

      clearTimeout(timeoutId);

      if (once) globalStatusCode[src] = STATUS.LOADED;
      this.status = STATUS.LOADED;

      awaitScriptReady(isReady || (() => true), timeout)
        .then(() => (this.status = STATUS.READY))
        .catch((err) => console.error('awaitScriptReady', err));
    }
  };

  render() {
    const {
      iframe,
      src,
      uid,
      global,
      props,
      trigger,
      onTrigger,
      onLoad,
      showWhen,
      status,
      once,
    } = this;
    let script;

    // Decide when to swap out default placeholder when script loads:
    const showWhenStatus =
      STATUS[String(showWhen).toUpperCase()] || STATUS.LOADED;

    // Should the iframe (or script) remain hidden?
    const hidden = status < showWhenStatus;

    // Do we want to render a script tag yet?
    if (!global && status > STATUS.WAITING && !(once && this.isOnPage())) {
      const Tag = iframe ? 'iframe' : 'script';
      const scriptProps = {
        src,
        onLoad,
        hidden,
        [SCRIPT_UID_ATTR]: uid,
        ...parseJSON(props)
      };
      script = <Tag {...scriptProps}></Tag>;
    }

    // Bind a click handler to the host element if necessary:
    const hostProps = {
      onClick: trigger === 'click' && status < STATUS.TRIGGERED && onTrigger,
    };

    // Decide whether to show either the placeholder or the result of the script:
    const hidePlaceholder = !hidden && status !== STATUS.TIMEOUT;

    return (
      <Host {...hostProps}>
        <div
          class="facade-script-placeholder"
          hidden={hidePlaceholder}
        >
          <slot></slot>
        </div>

        {script}

      </Host>
    );
  }
}

// Helper to parse JSON from attribute string if necessary:
function parseJSON(json: object | string): object {
  try {
    return (typeof json === 'object' ? json : (json && JSON.parse(json))) || {};
  } catch (err) {
    console.error('Error parsing `props`', err, 'JSON:', json)
    // return undefined;
  }
}

// Helper to create an element with attributes and append it to a DOM element:
function createElement(tag: string, props: object = {}, appendTo?: HTMLElement): void {
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

  if (appendTo) appendTo.appendChild(el);

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

const newIntersectionObserver = (callback: Function) => new IntersectionObserver(
  ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      callback();
    }
  }
);

const awaitScriptReady =
  async (test: Function, timeout: number, interval: number = 200) =>
    new Promise((resolve: (value: void) => void, reject: (reason: string) => void) => {
      let timeoutId: NodeJS.Timeout;

      // Run the test every n milliseconds to find out whether the script is ready:
      const intervalId: NodeJS.Timeout = setInterval(() => {
        if (test()) {
          // Clear timers and let the calling code know the script is ready to run:
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          resolve();
        }
      }, parseInt(interval as unknown as string) || 200);

      // Apply a timeout too: (Recommended)
      if (timeout) {
        timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          reject('timeout');
        }, parseInt(timeout as unknown as string) || 30000);
      }
    });

