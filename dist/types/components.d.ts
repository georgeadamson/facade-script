/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
import { PengScriptEvent, PengScriptStatusName } from "./components/peng-script/peng-script";
export namespace Components {
    interface PengScript {
        /**
          * To expose error message for debugging etc:
         */
        "errorMessage": string;
        /**
          * By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead.
         */
        "isGlobal"?: boolean;
        /**
          * By default a script tag will be rendered. Use this option to render an iframe instead.
         */
        "isIframe"?: boolean;
        /**
          * Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag.
         */
        "isOnce"?: boolean;
        /**
          * A callback function will triggered when the script or iframe has loaded and run.
         */
        "isReady"?: Function;
        /**
          * Optional props to set on the script or iframe. Map of key:values supplied as object or JSON.
         */
        "props"?: string | object;
        /**
          * Fine tune when an iframe will be shown. Defaults to wait until is has loaded.
         */
        "showWhen"?: PengScriptStatusName;
        "srcProd": string;
        /**
          * To expose status message for debugging etc:
         */
        "statusMessage": PengScriptStatusName;
        /**
          * Milliseconds to wait before discarding a slow loading script or iframe.
         */
        "timeout"?: number;
        /**
          * Specify when the script will be added to the page. Default is to lazy load.
         */
        "trigger"?: 'now' | 'lazy' | 'click' | Function;
        /**
          * Delay n milliseconds after being triggered.
         */
        "wait"?: number;
    }
}
declare global {
    interface HTMLPengScriptElement extends Components.PengScript, HTMLStencilElement {
    }
    var HTMLPengScriptElement: {
        prototype: HTMLPengScriptElement;
        new (): HTMLPengScriptElement;
    };
    interface HTMLElementTagNameMap {
        "peng-script": HTMLPengScriptElement;
    }
}
declare namespace LocalJSX {
    interface PengScript {
        /**
          * To expose error message for debugging etc:
         */
        "errorMessage"?: string;
        /**
          * By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead.
         */
        "isGlobal"?: boolean;
        /**
          * By default a script tag will be rendered. Use this option to render an iframe instead.
         */
        "isIframe"?: boolean;
        /**
          * Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag.
         */
        "isOnce"?: boolean;
        /**
          * A callback function will triggered when the script or iframe has loaded and run.
         */
        "isReady"?: Function;
        "onPengscript"?: (event: CustomEvent<PengScriptEvent>) => void;
        /**
          * Optional props to set on the script or iframe. Map of key:values supplied as object or JSON.
         */
        "props"?: string | object;
        /**
          * Fine tune when an iframe will be shown. Defaults to wait until is has loaded.
         */
        "showWhen"?: PengScriptStatusName;
        "srcProd"?: string;
        /**
          * To expose status message for debugging etc:
         */
        "statusMessage"?: PengScriptStatusName;
        /**
          * Milliseconds to wait before discarding a slow loading script or iframe.
         */
        "timeout"?: number;
        /**
          * Specify when the script will be added to the page. Default is to lazy load.
         */
        "trigger"?: 'now' | 'lazy' | 'click' | Function;
        /**
          * Delay n milliseconds after being triggered.
         */
        "wait"?: number;
    }
    interface IntrinsicElements {
        "peng-script": PengScript;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "peng-script": LocalJSX.PengScript & JSXBase.HTMLAttributes<HTMLPengScriptElement>;
        }
    }
}
