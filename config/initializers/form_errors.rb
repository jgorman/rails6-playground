# Insert model validation error messages after the input elements.
#
# Add this file to config/initializers/form_errors.rb
#
# You can configure these options here.

config = {
  error: 'error',
  invalid: 'invalid',
  template: '<span class="{error}"><br>{message}</span>'
}

ActionView::Base.field_error_proc =
  Proc.new do |html_tag, instance_tag|

    # Find the invalid input element.
    fragment = Nokogiri::HTML.fragment(html_tag)
    field = fragment.at('input,select,textarea')

    if field

      # Get the configuration options.
      error = config[:error]
      invalid = config[:invalid]
      template = config[:template]

      # Add the input element invalid class.
      field['class'] = "#{field['class']} #{invalid}"

      # Create the error message alert element.
      model = instance_tag.object
      field_name = instance_tag.instance_variable_get(:@method_name)
      field_title = field_name.titleize
      field_errors = model.errors[field_name]
      message = field_errors.map { |msg| "#{field_title} #{msg}" }.join(', ')
      alert = template.gsub('{error}', error).gsub('{message}', message)

      # Append the alert to the invalid input element.
      html = "#{fragment.to_s} #{alert}".html_safe

    else

      # Return the element as is.
      html = html_tag

    end

    html.html_safe
  end
