import { p as promiseResolve, b as bootstrapLazy } from './index-b02535be.js';

/*
 Stencil Client Patch Browser v2.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["peng-script",[[1,"peng-script",{"srcProd":[1,"src"],"isIframe":[4,"iframe"],"isOnce":[4,"once"],"isGlobal":[4,"global"],"trigger":[1],"wait":[2],"props":[1],"showWhen":[1,"show-when"],"timeout":[2],"isReady":[16],"errorMessage":[513,"error"],"statusMessage":[513,"status"],"status":[32],"error":[32]}]]]], options);
});
