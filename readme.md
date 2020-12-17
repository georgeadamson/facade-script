![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# \<facade-script>

A custom element to lazy-load or late-load any script or embed only when the user _needs_ it.

For example to only load a YouTube iframe when the user _scrolls down_ to it.

Perfect for the [Mindful-loading pattern](https://uxdesign.cc/boost-page-speed-with-mindful-loading-28905edac84d) or [Import on interaction pattern](https://addyosmani.com/blog/import-on-interaction/)

Loading can be triggered by:

- Scrolling (lazyload is the default)
- Click (such as you own Play button)

## Step 1

Include this script in your page:
(In the head without the async attribute if it's urgent, otherwise further down :)

```js
<script
  async
  type="module"
  src="https://unpkg.com/facade-script/dist/facade-script/facade-script.esm.js"
></script>
```

## Step 2

Use the tag instead of the standard script or iframe...

### To lazyload a script only when the user scrolls down to it:

Just use this tag instead of a regular `<script>` tag:

```js
<facade-script src="https://path/to/a/script.js"></facade-script>
```

### To lazyload a YouTube video only when the user scrolls down to it:

```js
<facade-script
  iframe
  src="https://www.youtube.com/embed/GTUruS-lnEo"
></facade-script>
```

### To show a placeholder until a YouTube video is lazyloaded:

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
<facade-script once src="https://path/to/a/script.js"></facade-script>
```

---

### `trigger` ("now" | "lazy" | "click")

When should the script be added to the page?

- `now` - Immediately. Much like a standard script.
- `lazy` - When this element is scrolled into view.
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

Delay n milliseconds after being triggered.

```js
<facade-script
  iframe
  wait="2000"
  src="https://www.youtube.com/embed/GTUruS-lnEo"
></facade-script>
```
