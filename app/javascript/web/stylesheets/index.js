// https://github.com/webpack/docs/wiki/context
const requireAll = context => context.keys().map(context)

// Custom compiled bootstrap.
require('./bootstrap')

// Import the page view styles that can come in any order.
requireAll(require.context('./views', true, /\.(css|scss)$/i))
