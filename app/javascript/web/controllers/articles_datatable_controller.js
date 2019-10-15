import DataTable from 'stimulus-datatables'

export default class extends DataTable {
  toggle_scrolling = event => {
    const table = $('#articles-datatable')[0]
    if (table && table.dt) {
      const dt = table.dt
      dt.setScrollingState()
      dt.teardown() // This triggers a reconnect.
    }
  }

  initialize() {
    super.initialize() && this.setScrollingState()
  }

  setScrollingState = () => {
    const checkbox = $('#toggle-scrolling')[0]
    const scrolling = checkbox && checkbox.checked
    const config = this.config || {}
    config.scroller = scrolling
    config.scrollY = scrolling ? 600 : undefined
  }
}
