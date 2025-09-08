# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      password: 'password',
      registration: 'register'
    }

  get "up" => "rails/health#show",
    as: :rails_health_check

  root 'home#index'
end
