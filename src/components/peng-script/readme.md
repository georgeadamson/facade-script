# peng-script



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute   | Description | Type                                                                                                            | Default                                  |
| --------------- | ----------- | ----------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `errorMessage`  | `error`     |             | `string`                                                                                                        | `undefined`                              |
| `head`          | `head`      |             | `boolean`                                                                                                       | `false`                                  |
| `isIframe`      | `iframe`    |             | `boolean`                                                                                                       | `undefined`                              |
| `isReady`       | --          |             | `Function`                                                                                                      | `undefined`                              |
| `once`          | `once`      |             | `boolean`                                                                                                       | `false`                                  |
| `props`         | `props`     |             | `object \| string`                                                                                              | `undefined`                              |
| `showWhen`      | `show-when` |             | `"IDLE" \| "LOADED" \| "LOADING" \| "READY" \| "TIMEOUT" \| "TRIGGERED" \| "TRIGGERED_BUT_NO_SRC" \| "WAITING"` | `'LOADED'`                               |
| `srcProd`       | `src`       |             | `string`                                                                                                        | `undefined`                              |
| `statusMessage` | `status`    |             | `"IDLE" \| "LOADED" \| "LOADING" \| "READY" \| "TIMEOUT" \| "TRIGGERED" \| "TRIGGERED_BUT_NO_SRC" \| "WAITING"` | `STATUS_NAME[STATUS.IDLE].toLowerCase()` |
| `timeout`       | `timeout`   |             | `number`                                                                                                        | `undefined`                              |
| `trigger`       | `trigger`   |             | `"click" \| "lazy" \| "now" \| Function`                                                                        | `'lazy'`                                 |
| `wait`          | `wait`      |             | `number`                                                                                                        | `0`                                      |


## Events

| Event        | Description | Type                                                                                                                                   |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `pengscript` |             | `CustomEvent<{ status: PengScriptStatusName; code: PengScriptStatusCode; error: 1; errorMessage: string; src: string; id?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
