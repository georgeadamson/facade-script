import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'peng-script',
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
};
