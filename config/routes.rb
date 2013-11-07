PollCheetah::Application.routes.draw do
  devise_for :users

  resources :users, :only => [:show]

  post "/sms" => "votes#create"
  
  root :to => "root#root"
end