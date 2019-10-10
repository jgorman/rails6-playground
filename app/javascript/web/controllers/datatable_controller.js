import { Controller } from "stimulus"

/*

  <table id="articles-datatable" class="table"
    data-controller="datatable"
    data-datatable-config="<%= {
      debug: true,
      serverSide: true,
      ajax: datatable_articles_path,
      dom: 'lfriptrip',
      columns: [
        {title: 'Title', data: 'title', width: "30%" },
        {title: 'Text', data: 'text', },
      ],
    }.to_json %>"
  >
  </table>

*/

var dt_id = 0

class StimulusDataTables extends Controller {

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

		// Setting scrollY fixes page reload bug in autoWidth.
		const pre_config = Object.assign({ scrollY: undefined }, this.config)
		const config_s = this.data.get('config')
		const config = config_s ? JSON.parse(config_s) : {}
		this.config = Object.assign({}, pre_config, config)

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

export default StimulusDataTables
