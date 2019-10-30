import DataTable from 'stimulus-datatables'

export default class extends DataTable {
  initialize() {
    if (!this.isBooting()) return

    // Link to the scrolling checkbox and back.
    const checkbox = $('#toggle-scrolling')[0]
    if (checkbox) {
      checkbox.dt = this
      this.checkbox = checkbox
    }

    // Get the table config and the scrolling state.
    super.initialize()
    this.setScrollingState()
  }

  toggle_scrolling = event => {
    const dt = this.element.dt
    if (dt) {
      dt.setScrollingState()
      dt.teardown() // This triggers a reconnect.
    }
  }

  setScrollingState = () => {
    const scrolling = this.checkbox && this.checkbox.checked
    const config = this.config || {}
    config.scroller = scrolling
    config.scrollY = scrolling ? 600 : undefined
    config.stateSave = !scrolling
  }
}
