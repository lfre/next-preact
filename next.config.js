module.exports = require('next-plugin-preact')({
  experimental: {
    esmExternals: false // https://github.com/preactjs/next-plugin-preact/issues/61
  }
});