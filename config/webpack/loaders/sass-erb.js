// https://github.com/rails/webpacker/issues/1163

// loaders/sass-erb.js
const { environment } = require('@rails/webpacker');
const erbLoader  = require('./erb');
const sassLoaders = environment.loaders.get('sass').use

module.exports = {
  test: /\.(scss|sass)(\.erb)$/i,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    ...sassLoaders,
    erbLoader.use[0]
  ]
}

