'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d0fcffb1.js');

/*
 Stencil Client Patch Esm v2.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if ( !(index.CSS && index.CSS.supports && index.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-9bad8e8a.js'); }).then(() => {
            if ((index.plt.$cssShim$ = index.win.__cssshim)) {
                return index.plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["facade-script.cjs",[[1,"facade-script",{"srcProd":[1,"src"],"isIframe":[4,"iframe"],"isOnce":[4,"once"],"isGlobal":[4,"global"],"trigger":[1],"wait":[2],"props":[1],"showWhen":[1,"show-when"],"timeout":[2],"isReady":[16],"errorMessage":[513,"error"],"statusMessage":[513,"status"],"status":[32],"error":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
