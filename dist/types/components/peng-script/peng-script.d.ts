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
  isIframe?: boolean;
  isOnce?: boolean;
  isGlobal?: boolean;
  trigger?: 'now' | 'lazy' | 'click' | Function;
  wait?: number;
  props?: string | object;
  showWhen?: PengScriptStatusName;
  timeout?: number;
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
