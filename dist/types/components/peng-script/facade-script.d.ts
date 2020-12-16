import { EventEmitter } from '../../stencil-public-runtime';
export declare type PengScriptStatusCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0.1;
export declare type PengScriptStatusName = 'IDLE' | 'TRIGGERED_BUT_NO_SRC' | 'TRIGGERED' | 'WAITING' | 'LOADING' | 'LOADED' | 'READY' | 'TIMEOUT';
export declare type PengScriptEvent = {
  status: PengScriptStatusName;
  code: PengScriptStatusCode;
  error: PengScriptErrorCode;
  errorMessage: string;
  src: string;
  id?: string;
};
export declare type PengScriptErrorCode = 1;
export declare class PengScript {
  srcProd: string;
  /** By default a script tag will be rendered. Use this option to render an iframe instead. */
  isIframe?: boolean;
  /** Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. */
  isOnce?: boolean;
  /** By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead. */
  isGlobal?: boolean;
  /** Specify when the script will be added to the page. Default is to lazy load. */
  trigger?: 'now' | 'lazy' | 'click' | Function;
  /** Delay n milliseconds after being triggered. */
  wait?: number;
  /** Optional props to set on the script or iframe. Map of key:values supplied as object or JSON. */
  props?: string | object;
  /** Fine tune when an iframe will be shown. Defaults to wait until is has loaded. */
  showWhen?: PengScriptStatusName;
  /** Milliseconds to wait before discarding a slow loading script or iframe. */
  timeout?: number;
  /** A callback function will triggered when the script or iframe has loaded and run. */
  isReady?: Function;
  /** To expose error message for debugging etc: */
  errorMessage: string;
  /** To expose status message for debugging etc: */
  statusMessage: PengScriptStatusName;
  private host;
  status: PengScriptStatusCode;
  error: PengScriptErrorCode;
  onError(code: PengScriptErrorCode): void;
  onStatus(code: PengScriptStatusCode, oldCode: PengScriptStatusCode): void;
  pengscript: EventEmitter<PengScriptEvent>;
  private src;
  private timeoutId;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private onTrigger;
  private onLoad;
  render(): any;
}
