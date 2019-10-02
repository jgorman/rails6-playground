import { Controller } from "stimulus"

/*
 * In app/view/articles/search.html.erb
 *

  <table class="table" id="articles-datatable"
         data-controller="articles"
         data-source="<%= datatable_articles_path %>">

	<input id="toggle-scrolling" type="checkbox" checked
				data-controller="articles"
				data-action="change->articles#toggle_scrolling" />

*/

/*
 * In app/view/articles/generate.html.erb
 *

	<%= form_tag generator_articles_path,
		'data-controller': 'articles',
		'data-action': 'ajax:success->articles#show_counts',
		remote: true, format: :json do %>

*/

var tableHandle

const scrollY = 600

const tableConfig = {
	processing: true,
	serverSide: true,
	// ajax: $(table).data('source'),
	dom: 'lfriptrip',
	pagingType: 'full_numbers',
	deverRender: true,
	scroller: false,
	scrollY: undefined,
	columns: [
		{data: 'title', width: "30%" },
		{data: 'text', width: "70%" }
	]
}

export default class extends Controller {

  connect() {
    const table = this.element
		console.log('$$$$$$$ connect.table', {table})
		const {id, className} = table

		// Initialize the datatable on connect.
		if (id !== "articles-datatable") return

    // Don't double initialize.
    if (table.className.includes('dataTable')) return

		// Scroll if checked.
		const checkbox = $("#toggle-scrolling")
		const scrolling = checkbox && checkbox[0].checked
		tableConfig.scroller = scrolling
		tableConfig.scrollY = scrolling ? scrollY : undefined

		tableConfig.ajax = $(table).data('source')
    tableHandle = $(table).DataTable(Object.assign({}, tableConfig))
  }

	// Destroy the handle to trigger re-initialization.
	// https://datatables.net/reference/api/destroy()
	toggle_scrolling(event) {
		tableHandle && tableHandle.destroy()
	}

  show_counts(event) {
    const data = event.detail[0]
    $("#article-count").html(data.articles)
    $("#comment-count").html(data.comments)
  }

}
