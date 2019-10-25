const { environment } = require('@rails/webpacker')

const erb =  require('./loaders/erb')
const sassErb =  require('./loaders/sass-erb')
environment.loaders.prepend('erb', erb)
environment.loaders.insert('sass-erb', sassErb, { before: 'erb'} )

// const BundleAnalyzer = require('webpack-bundle-analyzer')
// const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin
// environment.plugins.prepend('Analyzer', BundleAnalyzerPlugin)

module.exports = environment
