class ArticlesController < ApplicationController

  def index
    @page_title = "Articles"
    @articles = Article.page(params[:page])
    #puts "$$$$$$$ #{current_user.inspect}"
  end

  def search
    @page_title = "Article search"
  end

  def datatable
    render json: ArticleDatatable.new(params)
  end

  def show
    @page_title = "Article"
    @article = Article.find(params[:id])
    #current_user.roles = [:staff, :clerk]
    #puts "####### #{current_user.inspect}"
    #puts "####### #{current_user.roles.inspect}"
    #current_user.update({})
  end

  def new
    @page_title = "New Article"
    @article = Article.new
  end

  def edit
    @page_title = "Edit Article"
    @article = Article.find(params[:id])
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render "new"
    end
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render "edit"
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    redirect_to articles_path
  end

  def generate
    @page_title = "Generate Articles"

    @articles = Article.count
    @comments = Comment.count
  end

  def generator
    articles = params[:articles].to_i
    comments = params[:comments].to_i
    paragraph_length = params[:paragraph_length].to_i

    Article.generate(articles, comments, paragraph_length)
    counts = { articles: Article.count, comments: Comment.count }

    render json: counts, status: :created
  end

  private
    def article_params
      params.require(:article).permit(:title, :text)
    end
end
