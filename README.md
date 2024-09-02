# Next with Preact

## Works with ➡️ 14.2

> Since Next 13.5, Next compiles some of its dist folder into the "dist/compiled/next-server" folder only when publishing to NPM. This means the file "dist/server/render.js" is not the one that runs, and thus the patch does nothing. Instead the patches would have to be applied to "dist/compiled/next-server/pages.runtime.dev.js" and "pages.runtime.prod.js" accordingly. These files are minified so they're much harder to modify. The approach has changed to instead patch Preact with a custom version of `renderToReadableStream` that works with Next.

![](https://media3.giphy.com/media/s239QJIh56sRW/giphy.gif)

_...Sighs in JavaScript..._

If you're unable to use the `app` directory with React Server Components, streaming SSR, Suspense and other React 18 features, but still want/need improvements to Next and its utilities, Next with Preact is for you.

> Preact added `renderToReadableStream` in version [6.5.0](https://github.com/preactjs/preact-render-to-string/pull/296). However, App Router is stil incompatible with Preact due to some internal mismatching within hooks.

## ⚠️ Disclaimer ⚠️

My approach was to achieve this with the least amount of changes to Next.js pointing back to Next 12.3.4. So I can't promise that this will work for all your use cases. I also can't promise that this will automatically work in future versions. Proceed with caution.

## Demo

[Live URL](https://7s2mt8-3000.csb.app/) |
[CodeSandbox](https://codesandbox.io/p/github/lfre/next-13-preact/main)

## Dependencies

- [next-preact-plugin](https://github.com/preactjs/next-plugin-preact)
- [patch-package](https://github.com/ds300/patch-package)

## Usage

Follow the instructions in [next-preact-plugin](https://github.com/preactjs/next-plugin-preact)

Copy the `patches` directory to your project root.

> If you're using `patch-package` already, add the `.patch` included here to your `patches` directory.

Install [`patch-package`](https://www.npmjs.com/package/patch-package), and run `patch-package` in `postinstall`:

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```
## Patches

- Remove the check for React 18 in `next/dist/build/webpack-config.js`
- Add `server.browser` export to `preact/package.json`
- Add `renderToReadableStream` to `preact/compat/server.js`
  
