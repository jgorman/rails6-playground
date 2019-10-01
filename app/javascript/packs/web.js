// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// https://github.com/webpack/docs/wiki/context
const requireAll = context => context.keys().map(context)

requireAll(require.context('../web/stylesheets', false, /\.(scss|css)$/i))

requireAll(require.context('../web/javascript', false, /\.(js|jsx)$/i))

const images = require.context('../images', false, /\.(png|svg|jpg)$/i)
// const imagePath = (name) => images(name, true)
