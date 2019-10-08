import { Controller } from "stimulus"

/*
 * In app/view/articles/search.html.erb
 *

		<table id="articles-datatable"
			class="table table-hover table-striped table-bordered"
			data-controller="datatables"
			data-datatables-config="<%= {
				debug: true,
				serverSide: true,
				ajax: datatable_articles_path,
				processing: true,
				scroller: true,
				scrollY: 600,
				dom: 'lfriptrip',
				pagingType: 'full_numbers',
				columns: [
					{title: 'Title', data: 'title', width: "30%" },
					{title: 'Text', data: 'text', width: "70%" },
				],
			}.to_json %>"
		>
		</table>

*/

// Register controllers for external control.
window.dataTableControllers = {}

// Register external initializers.
if (!window.dataTableInitializers) {
	window.dataTableInitializers = {}
}

var dt_id = 0

export default class extends Controller {

	isPreview = () =>
		document.documentElement.hasAttribute("data-turbolinks-preview")

	isDataTable = () => this.element.className.includes('dataTable')

	logger = (msg, extra = '') => {
		if (!this.config || !this.config.debug) return
		const id = this.element.id
		const pad = (msg.length < 10) ? (10 - msg.length) : 0
		console.log('@@@', this.dt_id, msg, ' '.repeat(pad), id)
	}

	initialize = () => {
		if (this.isPreview()) return
		if (this.isDataTable()) return
		this.dt_id = ++dt_id

		const config = this.data.get('config')
		this.config = config ? JSON.parse(config) : {}

		const id = this.element.id
		if (id) {
			// Register the controller for external control.
			window.dataTableControllers[id] = this

			// Custom initialization funcion.
			const init = window.dataTableInitializers[id]
			if (init) {
				init(this)
				this.logger('customInit')
			}
		}

		this.logger('initialize')
	}

  connect = () => {
		if (this.isPreview()) return
		if (this.isDataTable()) return

		// Register the teardown listener and start up DataTable.
		this.logger('dataTable')
		document.addEventListener('turbolinks:before-render', this.teardown);
    this.tableHandle = $(this.element).DataTable(Object.assign({}, this.config))
  }

	teardown = event => {
		this.logger('teardown')
		if (this.tableHandle) {
			document.removeEventListener('turbolinks:before-render', this.teardown);
			this.tableHandle.destroy()
			this.tableHandle = undefined
		}
	}

}
