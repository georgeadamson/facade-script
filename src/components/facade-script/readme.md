# facade-script

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute   | Description                                                                                                                                                                                            | Type                                                                                                            | Default                    |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `errorMessage`  | `error`     | To expose error message for debugging etc:                                                                                                                                                             | `string`                                                                                                        | `undefined`                |
| `isGlobal`      | `global`    | By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead.                                                        | `boolean`                                                                                                       | `false`                    |
| `isIframe`      | `iframe`    | By default a script tag will be rendered. Use this option to render an iframe instead.                                                                                                                 | `boolean`                                                                                                       | `undefined`                |
| `isOnce`        | `once`      | Every instance of this component will add a script when triggered. Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag.                     | `boolean`                                                                                                       | `false`                    |
| `isReady`       | --          | Supply a function that will return true when your script has loaded an run. For example to detect `'myVideoPlayer' in window`. Without this we assume the script is ready for use as soon as it loads. | `Function`                                                                                                      | `undefined`                |
| `props`         | `props`     | Optional props to set on the script or iframe. Map of key:values supplied as object or JSON.                                                                                                           | `object \| string`                                                                                              | `undefined`                |
| `showWhen`      | `show-when` | Fine tune when an iframe will be shown. Defaults to wait until is has loaded.                                                                                                                          | `"IDLE" \| "LOADED" \| "LOADING" \| "READY" \| "TIMEOUT" \| "TRIGGERED" \| "TRIGGERED_BUT_NO_SRC" \| "WAITING"` | `'LOADED'`                 |
| `srcProd`       | `src`       | src for the `<script>` or `<iframe>` that will be added to the DOM when lazyload is triggered.                                                                                                         | `string`                                                                                                        | `undefined`                |
| `statusMessage` | `status`    | To expose status message for debugging etc:                                                                                                                                                            | `"IDLE" \| "LOADED" \| "LOADING" \| "READY" \| "TIMEOUT" \| "TRIGGERED" \| "TRIGGERED_BUT_NO_SRC" \| "WAITING"` | `STATUS_NAME[STATUS.IDLE]` |
| `timeout`       | `timeout`   | Milliseconds to wait before discarding a slow loading script or iframe.                                                                                                                                | `number`                                                                                                        | `undefined`                |
| `trigger`       | `trigger`   | Specify when the script will be added to the page. Default is to lazy load.                                                                                                                            | `"click" \| "lazy" \| "now" \| Function`                                                                        | `'lazy'`                   |
| `wait`          | `wait`      | Delay n milliseconds after being triggered.                                                                                                                                                            | `number`                                                                                                        | `0`                        |


## Events

| Event        | Description | Type                                                                                                                                   |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `pengscript` |             | `CustomEvent<{ status: PengScriptStatusName; code: PengScriptStatusCode; error: 1; errorMessage: string; src: string; id?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
