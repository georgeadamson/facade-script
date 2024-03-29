import { EventEmitter } from '../../stencil-public-runtime';
export declare type PengScriptStatusCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0.1;
export declare type PengScriptStatusName = 'IDLE' | 'TRIGGERED_BUT_NO_SRC' | 'TRIGGERED' | 'WAITING' | 'LOADING' | 'LOADED' | 'READY' | 'TIMEOUT';
export declare type PengScriptEvent = {
  code: PengScriptStatusCode;
  status: PengScriptStatusName;
  error?: PengScriptErrorCode;
  errMsg?: string;
  iframe?: boolean;
  once?: boolean;
  id?: string;
  src: string;
};
export declare type PengScriptErrorCode = 1;
export declare class FacadeScript {
  /** Required. src for the `<script>` or `<iframe>` that will be added to the DOM when lazyload is triggered. */
  srcProd: string;
  /** By default a script tag will be rendered. Use this option to render an iframe instead. */
  iframe?: boolean;
  /** Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. */
  once?: boolean;
  /** By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead. */
  global?: boolean;
  /** Specify when the script will be added to the page. Default is to lazy load. */
  trigger?: 'lazy' | 'click' | 'now' | Function;
  /** Delay n milliseconds after being triggered. Defaults to no wait */
  wait?: number;
  /** Optional props to set on the script or iframe. Map of key:values supplied as object or JSON. */
  props?: string | object;
  /** Fine tune when an iframe will be shown. Defaults to wait until is has loaded. */
  showWhen?: PengScriptStatusName;
  /** Milliseconds to wait before discarding a slow loading script or iframe. */
  timeout?: number;
  /** A function that will return true when your script has loaded an run. For example to detect `'myVideoPlayer' in window`. Without this we assume the script is ready for use as soon as it loads. */
  ready?: Function;
  /** Readonly. Exposes any error message for debugging or as a hook for a CSS selector: */
  errMsg?: string;
  /** Readonly: Expose the current status for debugging or as a hook for a CSS selector: */
  statusMsg?: PengScriptStatusName;
  /** Optionally output debug info to the console whenever the component changes state */
  debug?: boolean;
  private host;
  private status;
  private error;
  onError(code: PengScriptErrorCode): void;
  onStatus(code: PengScriptStatusCode, oldCode: PengScriptStatusCode): void;
  facadescript: EventEmitter<PengScriptEvent>;
  private src;
  private uid;
  private timeoutId;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private isOnPage;
  private onTrigger;
  private onLoad;
  render(): any;
}
