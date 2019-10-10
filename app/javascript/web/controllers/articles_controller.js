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

export default class extends Controller {

  show_counts = event => {
    const data = event.detail[0] || {}
    $("#article-count").html(data.articles)
    $("#comment-count").html(data.comments)
  }

}
