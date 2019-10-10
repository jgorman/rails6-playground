import DataTable from './datatable_controller'

export default class extends DataTable {

	// This updates the article-search config from the scrolling checkbox.
	setScrollingState = () => {
		const toggler = $('#toggle-scrolling')[0]
		const scrolling = toggler && toggler.checked
		const config = this.config || {}
		config.scroller = scrolling
		config.scrollY = scrolling ? 600 : undefined
	}

	toggle_scrolling = event => {
    const table = $('#articles-datatable')[0]
    if (table && table.controller) {
      const dt = table.controller
      dt.setScrollingState()
      dt.teardown() // This triggers a reconnect.
    }
  }

	initialize() {
		super.initialize() && this.setScrollingState()
	}

}
