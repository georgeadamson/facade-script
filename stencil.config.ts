import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'facade-script',
  buildEs5: 'prod',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [{ src: 'sample-script.js' }],
      serviceWorker: null, // disable service workers
    },
  ],

  // https://stenciljs.com/docs/config-extras
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: false,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
};
