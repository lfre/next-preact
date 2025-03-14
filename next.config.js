const { WEBPACK_LAYERS } = require('next/dist/lib/constants');

module.exports = require('next-plugin-preact')({
  experimental: {
    esmExternals: false // https://github.com/preactjs/next-plugin-preact/issues/61
  },
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev && !isServer) {
      config.plugins.unshift({
        apply(compiler) {
          compiler.hooks.thisCompilation.tap('Prefresh', (compilation) => {
            /*
              Since v15.2.0-canary.56, Next added webpack layers in this PR:
              https://github.com/vercel/next.js/pull/75878
              Any plugin that adds additional entries needs to specify the right layer.
              Otherwise, the entry will be considered a duplicate in the bundle.
              This is mostly fine, except that for Prefresh to work, it needs to set options.vnode in the same module in memory.
              Without a layer, the options.vnode gets set in a different object in memory than the preact module the app loads.
            */
            // !IMPORTANT: This changes every entry, this can be more specific when Prefresh allows overriding the individual entry option
            compilation.globalEntry.options.layer = WEBPACK_LAYERS.pagesDirBrowser;
          });
        }
      });
    }
    return config;
  }
});