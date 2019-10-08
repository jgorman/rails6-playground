import { Controller } from "stimulus"

/*
 * In app/view/articles/generate.html.erb
 *

		<%= form_tag generator_articles_path,
			'data-controller': 'articles',
			'data-action': 'ajax:success->articles#show_counts',
			remote: true, format: :json do
		%>

*/

/*
 * In app/view/articles/search.html.erb
 *

		<input id="toggle-scrolling" type="checkbox" checked
			data-controller="articles"
			data-action="change->articles#toggle_scrolling"
		/>

*/

// This updates the articles-datatables config from the scrolling checkbox.
const setScrollingState = dt_controller => {
	const config = dt_controller.config
	const old_scrolling = config.scroller
	const toggler = $('#toggle-scrolling')
	const scrolling = toggler && toggler[0] &&  toggler[0].checked
	config.scroller = scrolling
	config.scrollY = scrolling ? 600 : undefined
	return (scrolling !== old_scrolling)
}

if (!window.dataTableInitializers) {
	window.dataTableInitializers = {}
}
window.dataTableInitializers['articles-datatable'] = setScrollingState

export default class extends Controller {

  show_counts = event => {
    const data = event.detail[0] || {}
    $("#article-count").html(data.articles)
    $("#comment-count").html(data.comments)
  }

  toggle_scrolling = event => {
		const dt = window.dataTableControllers['articles-datatable']
		if (!dt) return

		const changed = setScrollingState(dt)
		if (changed && dt.tableHandle) {
			dt.tableHandle.destroy() // This triggers a reconnect.
		}
	}

}
