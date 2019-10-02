/*
 * Rails libraries.
 */

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

/*
 * npm libraries.
 */

require('bootstrap')

// Stimulus setup.
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
const application = Application.start()
const controllers = require.context('../web/controllers', true, /\.js$/)
application.load(definitionsFromContext(controllers))

// See ../web/controllers/particles_controller.js
require('particles.js')

/*
 * App setup.
 */

// https://github.com/webpack/docs/wiki/context
const requireAll = context => context.keys().map(context)

requireAll(require.context('../web/javascript', false, /\.(js|jsx)$/i))

requireAll(require.context('../web/stylesheets', false, /\.(scss|css)$/i))

const images = require.context('../images', false, /\.(png|svg|jpg)$/i)
//const imagePath = (name) => images(name, true)
