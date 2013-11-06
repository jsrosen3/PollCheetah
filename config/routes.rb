PollCheetah::Application.routes.draw do
  devise_for :users

  resources :users, :only => [:show]

  post "/users/guest" => "users#guest"

  root :to => "root#root"
end