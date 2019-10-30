import { Controller } from 'stimulus'

/*
 * In app/view/articles/generate.html.erb
 *

  <%= form_tag generator_articles_path,
    'data-controller': 'articles',
    'data-action': 'ajax:success->articles#show_counts',
    remote: true, format: :json do
  %>
  <%= submit_tag 'Generate!' %>
  <% end %>

*/

export default class extends Controller {
  show_counts = event => {
    const data = event.detail[0] || {}
    $('#article-count').html(data.articles)
    $('#comment-count').html(data.comments)
  }
}
