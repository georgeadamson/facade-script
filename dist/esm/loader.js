import { C as CSS, p as plt, w as win, a as promiseResolve, b as bootstrapLazy } from './index-d373a0aa.js';

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if ( !(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-8de9f2ac.js').then(() => {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["facade-script",[[4,"facade-script",{"srcProd":[1,"src"],"iframe":[4],"once":[4],"global":[4],"trigger":[1],"wait":[2],"props":[1],"showWhen":[1,"show-when"],"timeout":[2],"isReady":[16],"errMsg":[513,"error"],"statusMsg":[513,"status"],"debug":[4],"status":[32],"error":[32]}]]]], options);
  });
};

export { defineCustomElements };
