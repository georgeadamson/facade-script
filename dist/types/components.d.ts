/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
import { PengScriptEvent, PengScriptStatusName } from "./components/facade-script/facade-script";
export namespace Components {
    interface FacadeScript {
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
          * Supply a function that will return true when your script has loaded an run. For example to detect `'myVideoPlayer' in window`. Without this we assume the script is ready for use as soon as it loads.
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
        /**
          * src for the `<script>` or `<iframe>` that will be added to the DOM when lazyload is triggered.
         */
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
    interface HTMLFacadeScriptElement extends Components.FacadeScript, HTMLStencilElement {
    }
    var HTMLFacadeScriptElement: {
        prototype: HTMLFacadeScriptElement;
        new (): HTMLFacadeScriptElement;
    };
    interface HTMLElementTagNameMap {
        "facade-script": HTMLFacadeScriptElement;
    }
}
declare namespace LocalJSX {
    interface FacadeScript {
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
          * Supply a function that will return true when your script has loaded an run. For example to detect `'myVideoPlayer' in window`. Without this we assume the script is ready for use as soon as it loads.
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
        /**
          * src for the `<script>` or `<iframe>` that will be added to the DOM when lazyload is triggered.
         */
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
        "facade-script": FacadeScript;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "facade-script": LocalJSX.FacadeScript & JSXBase.HTMLAttributes<HTMLFacadeScriptElement>;
        }
    }
}
