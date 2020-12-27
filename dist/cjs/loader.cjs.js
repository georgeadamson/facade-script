'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c0158ca9.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if ( !(index.CSS && index.CSS.supports && index.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-32af3d0c.js'); }).then(() => {
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
  return index.bootstrapLazy([["facade-script.cjs",[[4,"facade-script",{"srcProd":[1,"src"],"iframe":[4],"once":[4],"global":[4],"trigger":[1],"wait":[2],"props":[1],"showWhen":[1,"show-when"],"timeout":[2],"isReady":[16],"errorMsg":[513,"error"],"statusMsg":[513,"status"],"debug":[4],"status":[32],"error":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
