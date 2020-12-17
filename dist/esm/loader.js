import { p as promiseResolve, b as bootstrapLazy } from './index-5b415241.js';

/*
 Stencil Client Patch Esm v2.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["facade-script",[[1,"facade-script",{"srcProd":[1,"src"],"isIframe":[4,"iframe"],"isOnce":[4,"once"],"isGlobal":[4,"global"],"trigger":[1],"wait":[2],"props":[1],"showWhen":[1,"show-when"],"timeout":[2],"isReady":[16],"errorMessage":[513,"error"],"statusMessage":[513,"status"],"status":[32],"error":[32]}]]]], options);
  });
};

export { defineCustomElements };
