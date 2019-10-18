require 'faker'

class Article < ApplicationRecord
  has_many :comments, dependent: :destroy
  validates :title, presence: true, length: { minimum: 5 }

  # Generate fake articles with comments.
  #
  # @param articles [Integer] number of articles to generate.
  # @param comments [Integer] number of comments per article.
  # @param paragraph_length [Integer] paragraph length in characters.
  def self.generate(articles, comments, paragraph_length)
    articles.times do
      article =
        Article.new(
          {
            title: Faker::Company.bs.titleize,
            text: Faker::Lorem.paragraph_by_chars(paragraph_length)
          }
        )
      article.save!

      comments.times do
        comment =
          Comment.new(
            {
              article_id: article.id,
              commenter: Faker::Name.name,
              body: Faker::Lorem.paragraph_by_chars(paragraph_length)
            }
          )
        comment.save!
      end
    end
  end
end
