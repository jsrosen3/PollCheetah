PollCheetah::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy]

  post '/create_guest' => "users#create_guest"

  resources :polls, :only => [:create, :index, :show]

  post "/sms" => "votes#create"
  
  root :to => "root#root"
end