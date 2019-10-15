import { Controller } from 'stimulus'

export default class extends Controller {

  initialize() {
    const config_s = this.data.get('config')
    this.config = config_s ? JSON.parse(config_s) : {}
    this.element.pjs = this
  }

  connect() {
    // Start up particles and capture the instance.
    window.particlesJS(this.element.id, this.config)
    this.pJS = window.pJSDom.pop().pJS
  }

  disconnect() {
    // Cancel the animation.
    const frame = this.pJS.fn.drawAnimFrame
    cancelAnimationFrame(frame)
  }
}
