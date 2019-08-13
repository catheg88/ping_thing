Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :current_user, only: [:show]
    resources :conversations, only: [:index, :show, :create] do
      resources :messages, only: [:index, :show, :create]
    end
  end

end
