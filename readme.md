[![npm version](https://badge.fury.io/js/facade-script.svg)](https://badge.fury.io/js/facade-script)

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# \<facade-script>

A custom element to **lazy-load** or late-load any script or embed, only when the user _needs_ it.

For example to only load a YouTube iFrame when the user _scrolls down_ to it.

TLDR usage:

- JS: `<facade-script src="/lazyload/any/script.js">` or
- iFrame: `<facade-script iframe src="/lazyload/any/embed.js">`

Perfect for the [Mindful-loading pattern](https://uxdesign.cc/boost-page-speed-with-mindful-loading-28905edac84d) or [Import on interaction pattern](https://addyosmani.com/blog/import-on-interaction/).

Loading can be triggered when you:

- Scroll it into view (lazyload is the default)
- Click it (for example your own Play button)

## Step 1 of 2

Include the script in your page: (~8.5kb gzipped)

```js
<script async type="module" src="https://unpkg.com/facade-script/dist/facade-script/facade-script.esm.js"
></script>
<script async nomodule src="https://unpkg.com/facade-script/dist/facade-script/facade-script.js"
></script>
```

☝️ Recommend using `async` for minimal impact on page load speed and because there's typically no hurry to fetch this script, but that's up to you.

## Step 2 of 2

Then you simply use the facade-script tag instead of a standard script or iframe...

### To lazyload a script:

A `<script>` tag will only be added to the page when the user scrolls this into view.

```js
<facade-script src="https://path/to/a/script.js"></facade-script>
```

### To lazyload a YouTube video:

An `<iframe>` tag will only be added to the page when the user scrolls this into view.

Recommended: For improved accessibility, supply a title attribute for the iframe too. See `props` below.

```js
<facade-script
  iframe
  src="https://www.youtube.com/embed/GTUruS-lnEo"
></facade-script>
```

### To show a placeholder until the iframe embed has loaded:

```js
<facade-script iframe src="https://www.youtube.com/embed/GTUruS-lnEo">
  <p>Loading...</p>
</facade-script>
```

## Advanced use cases

### `once` (boolean)

Use this to ensure a script is only loaded once on the page, even when there are multiple instances of the tag. Without this flag, every instance of this component will add the script to the page when triggered.

```js
<facade-script once src="https://path/to/a/script.js"></facade-script>
```

---

### `global` (boolean)

By default the script will be added to the page within the facade-script tags. Use the global option to add the script to the `<head>` instead.

```js
<facade-script global once src="https://path/to/a/script.js"></facade-script>
```

---

### `trigger` ("now" | "lazy" | "click")

When should the script be added to the page?

- `now` - Immediately. Much like a standard script. Kinda pointless but useful when debugging.
- `lazy` - When this element is scrolled into view. (Default)
- `click` - When this element is clicked.

```js
<facade-script
  iframe
  trigger="click"
  src="https://www.youtube.com/embed/GTUruS-lnEo"
>
  <button>Play video</button>
</facade-script>
```

---

### `wait="..."` (milliseconds)

After being triggered, delay n milliseconds before adding the script or iframe to the page.

```js
<facade-script
  iframe
  wait="2000"
  src="https://www.youtube.com/embed/GTUruS-lnEo"
></facade-script>
```

---

### `props` (to add attributes to your script or iframe)

Sometimes you need to set attributes on the `<script>` or `<iframe>` when it gets created.

Attributes can be supplied as a map of {key:value} supplied as JSON (or as an object if you're using JSX).

For example, iframes should have a title attribute:

```html
<facade-script
  iframe
  src="https://www.youtube.com/embed/GTUruS-lnEo"
  props="{\"title\":\"Title of iframe\"}"
></facade-script>
```

Or in JSX:

```jsx
<facade-script
  iframe
  src="https://www.youtube.com/embed/GTUruS-lnEo"
  props={{ title: 'Title of iframe' }}
></facade-script>
```

---

See this readme for a [full list of config options](https://github.com/georgeadamson/facade-script/tree/master/src/components/facade-script).

## Notes

- Curently in Beta. Appears stable but still testing in the wild.
- ~8.5kb when you use the CDN link (minified & gzipped). I have yet to see if I can make it smaller with some more analysis.
- To do: Solutions for better accessibility of placeholders etc.
- To do: Consider what happens during prerender. This should probably not render the script or iframe when running server-side.
- But why is it called facade-script? Because of the Facade Pattern: As well as lazyloading it can render a fake UI or placeholder until the real third party loads.
