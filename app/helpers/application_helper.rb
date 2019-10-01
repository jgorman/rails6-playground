module ApplicationHelper

  def escape(str)
    ERB::Util.html_escape(str)
  end

  def page_title
    @page_title || "Timeless"
  end

  def image_pack(name)
    asset_pack_path("media/images/#{name}")
  end

  module NoArgument end
  def tr_show(model, field, value = NoArgument)
    case model
    when Symbol
      model_name = model.to_s
    when String
      model_name = model
    else
      model_name = model.class.name.sub(/.*::/, "").underscore
      if value == NoArgument
        value = model.send(field.to_sym)
      end
    end

    if value == NoArgument
      value = ""
      if model = instance_variable_get("@#{model_name}")
        value = model.send(field.to_sym)
      end
    end

    id = "#{model_name}_#{field}"
    begin
      desc = I18n.translate!("helpers.label.#{model_name}.#{field}")
    rescue
      desc = field.to_s.titleize
    end
    tr = "
<div class=\"row\">
  <div class=\"col-sm-3\"><label for=\"#{id}\">#{escape(desc)}</label></div>
  <div class=\"col\" id=\"#{id}\">#{escape(value)}</div>
</div>
".html_safe
    tr
  end

end
