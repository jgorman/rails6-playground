import { Controller } from 'stimulus'

var sc_id = 0

class StimulusDebug extends Controller {
  debug = (msg, extra = '') => {
    if (!this.debugOn) return
    this.log(msg, extra)
  }

  log = (msg, extra = '') => {
    const id = this.element.id
    const pad = msg.length < 10 ? 10 - msg.length : 0
    console.log('SC', this.sc_id || 0, msg, ' '.repeat(pad), id, extra)
  }

  initialize() {
    this.sc_id = ++sc_id
    const debug = this.data.get('debug').toLowerCase()
    this.debugOn = debug === 'on' || debug === 'true' || debug === '1'

    this.debug('initialize', { sc: this })
  }

  connect() {
    this.debug('connect', { sc: this })
  }

  disconnect() {
    this.debug('disconnect', { sc: this })
  }
}

export default StimulusDebug
