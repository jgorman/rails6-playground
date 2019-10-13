import DataTable from 'stimulus-datatables'

export default class extends DataTable {
  toggle_scrolling = event => {
    const table = $('#articles-datatable')[0]
    if (table && table.controller) {
      const controller = table.controller
      controller.setScrollingState()
      controller.teardown() // This triggers a reconnect.
    }
  }

  initialize() {
    super.initialize() && this.setScrollingState()
  }

  setScrollingState = () => {
    const toggler = $('#toggle-scrolling')[0]
    const scrolling = toggler && toggler.checked
    const config = this.config || {}
    config.scroller = scrolling
    config.scrollY = scrolling ? 600 : undefined
  }
}
