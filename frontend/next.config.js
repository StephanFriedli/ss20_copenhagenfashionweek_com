const path = require('path')
// require('dotenv').config()

module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  // Absolute paths
  // https://github.com/zeit/next.js/blob/master/examples/with-absolute-imports/next.config.js
  webpack(config, options) {
    config.resolve.alias['@pages'] = path.join(__dirname, 'src/pages')
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils')
    // config.resolve.alias['@config'] = path.join(__dirname, 'src/config')
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles')
    return config
  },
}