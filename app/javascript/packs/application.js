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
const application = Application.start()
import { definitionsFromContext } from 'stimulus/webpack-helpers'
const controllers = require.context('../controllers', true, /\.js$/)
application.load(definitionsFromContext(controllers))

// See https://github.com/adrienpoly/stimulus-flatpickr
import Flatpickr from 'stimulus-flatpickr'
application.register('flatpickr', Flatpickr)

// See https://github.com/jgorman/rails-datatables
require('datatables.net')
require('datatables.net-bs4')
require('datatables.net-scroller-bs4')
import Datatable from 'rails-datatables'
application.register('datatable', Datatable)

// See https://github.com/jgorman/rails-particles.js
import Particles from 'rails-particles.js'
application.register('particles', Particles)

// See https://github.com/jgorman/rails-form-validation
import Form from 'rails-form-validation'
application.register('form', Form)

/*
 * App setup.
 */

// https://github.com/webpack/docs/wiki/context
const requireAll = context => context.keys().map(context)

requireAll(require.context('../javascript', false, /\.(js|jsx)$/i))

require('../stylesheets')

const images = require.context('../images', false, /\.(png|svg|jpg)$/i)
//const imagePath = (name) => images(name, true)
