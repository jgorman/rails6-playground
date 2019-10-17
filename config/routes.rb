Rails.application.routes.draw do
  root 'welcome#index'

  get "welcome/index"
  get "welcome/particles"
  get "welcome/bootstrap"
  get "welcome/rails6-config"
  get "welcome/ajax-datatable"
  get "welcome/custom-datatable"

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
