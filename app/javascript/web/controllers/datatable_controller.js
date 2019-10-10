import { Controller } from "stimulus"

/*
 * In app/view/articles/search.html.erb
 *

		<table id="articles-datatable"
			class="table table-hover table-striped table-bordered"
			data-controller="datatable"
			data-datatable-config="<%= {
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

var dt_id = 0

export default class extends Controller {

	isTable = () => this.element.nodeName === 'TABLE'

	isDataTable = () => this.element.className.includes('dataTable')

	isPreview = () =>
		document.documentElement.hasAttribute("data-turbolinks-preview")

	isLive = () => this.tableHandle

	isBooting = () =>
		this.isTable() &&
		!this.isDataTable() &&
		!this.isPreview() &&
		!this.isLive()

	logger = (msg, extra = '') => {
		if (!this.config || !this.config.debug) return
		const id = this.element.id
		const pad = (msg.length < 10) ? (10 - msg.length) : 0
		console.log('@@@', this.dt_id || 0, msg, ' '.repeat(pad), id, extra)
	}

	initialize() {
		if (!this.isBooting()) return false

		this.dt_id = ++dt_id
		this.element.controller = this

		// Component config takes precedence over subclass pre-initialize config.
		const config_s = this.data.get('config')
		const config = config_s ? JSON.parse(config_s) : {}
		this.config = Object.assign({}, this.config, config)

		this.logger('initialize')
		return this.config
	}

  connect() {
		if (!this.isBooting()) return false

		// Register the teardown listener and start up DataTable.
		document.addEventListener('turbolinks:before-render', this._teardown);
    this.tableHandle = $(this.element).DataTable(Object.assign({}, this.config))

		this.logger('connect')
		return this.config
  }

	_teardown = () => this.teardown()

	teardown(event) {
		if (!this.isLive()) return false

		document.removeEventListener('turbolinks:before-render', this._teardown);
		this.tableHandle.destroy()
		this.tableHandle = undefined

		this.logger('teardown')
		return this.config
	}

}
