# Default
# Proc.new { |html_tag, instance| "<div class=\"field_with_errors\">#{html_tag}</div>".html_safe }
ActionView::Base.field_error_proc = Proc.new do |html_tag, instance_tag|
  fragment = Nokogiri::HTML.fragment(html_tag)
  field = fragment.at('input,select,textarea')

  model = instance_tag.object
  field_name = instance_tag.instance_variable_get(:@method_name)
  field_title = field_name.titleize
  errors = model.errors[field_name]
  field_errors = errors.map { |error| "#{field_title} #{error}" }.join(', ')

  html = if field
           field['class'] = "#{field['class']} invalid"
           html = <<-HTML
			#{fragment.to_s}
			<p class="error">#{field_errors}</p>
           HTML
           html
         else
           html_tag
         end

  html.html_safe
end
