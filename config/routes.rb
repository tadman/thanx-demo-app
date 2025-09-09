# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
    path: "",
    path_names: {
      sign_in: "login",
      sign_out: "logout",
      password: "password",
      registration: "register"
    }

  namespace :api do
    resource :user, only: [ :show ]
    resources :accounts, only: [ :index, :show ] do |account|
      get :default, on: :collection

      resources :account_transactions, only: [ :index ]
    end
    resources :rewards, only: [ :index, :show ] do
      post :redeem, on: :member
    end
  end

  root "home#index"

  # React catch-all for reloads
  get "/*path", to: "home#index"
end
