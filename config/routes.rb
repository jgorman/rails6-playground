Rails.application.routes.draw do
  root 'welcome#index'

  get "welcome/rails6-config"

  resources :articles do
    resources :comments
    collection do
      get :search
      get :datatable
      get :generate
      post :generator
    end
  end
end
