const { environment } = require('@rails/webpacker')

const webpack = require('webpack')

/*
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  })
)

const aliasConfig = {
    'jquery': 'jquery/src/jquery',
};
environment.config.set('resolve.alias', aliasConfig);
*/

// const BundleAnalyzer = require('webpack-bundle-analyzer')
// const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin
// environment.plugins.prepend('Analyzer', BundleAnalyzerPlugin)

module.exports = environment
