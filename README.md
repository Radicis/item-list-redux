## Install

First, clone the repo;

And then install the dependencies with yarn.

```bash
$ cd item-list-redux
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## Created using electron-react-boilerplate

https://github.com/electron-react-boilerplate/electron-react-boilerplate
