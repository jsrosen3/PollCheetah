PollCheetah::Application.routes.draw do
  devise_for :users

  resources :users, :only => [:show]

  resources :polls, :only => [:create, :index, :show]

  post "/sms" => "votes#create"
  
  root :to => "root#root"
end