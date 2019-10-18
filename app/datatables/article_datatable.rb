class ArticleDatatable < AjaxDatatablesRails::ActiveRecord
  def view_columns
    # Declare strings in this format: ModelName.column_name
    # or in aliased_join_table.column_name format
    @view_columns ||=
      { title: { source: 'Article.title' }, text: { source: 'Article.text' } }
  end

  def data
    records.map do |record|
      { DT_RowId: record.id, title: record.title, text: record.text }
    end
  end

  def get_raw_records
    Article.all
  end
end
