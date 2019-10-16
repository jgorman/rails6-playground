/*
 * Rails startup.
 */

require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

/*
 * npm libraries.
 */

// If jQuery is not already registered in window.jQuery do it here.
window.jQuery = window.$ = require('jquery')

require('bootstrap')

// Stimulus setup.
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'
const application = Application.start()
const controllers = require.context('../web/controllers', true, /\.js$/)
application.load(definitionsFromContext(controllers))

// See https://github.com/adrienpoly/stimulus-flatpickr
import Flatpickr from 'stimulus-flatpickr'
application.register('flatpickr', Flatpickr)

// See https://github.com/jgorman/stimulus-datatables
require('datatables.net')
require('datatables.net-bs4')
require('datatables.net-scroller-bs4')
import Datatable from 'stimulus-datatables'
application.register('datatable', Datatable)

// See https://github.com/jgorman/stimulus-particles.js
//require('particles.js')
import Particles from 'stimulus-particles.js'
application.register('particles', Particles)

/*
 * App setup.
 */

// https://github.com/webpack/docs/wiki/context
const requireAll = context => context.keys().map(context)

requireAll(require.context('../web/javascript', false, /\.(js|jsx)$/i))

requireAll(require.context('../web/stylesheets', false, /\.(scss|css)$/i))

const images = require.context('../images', false, /\.(png|svg|jpg)$/i)
//const imagePath = (name) => images(name, true)
