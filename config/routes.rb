Rails.application.routes.draw do
  root 'welcome#index'

  get "welcome/rails6-config"
end
