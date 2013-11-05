PollCheetah::Application.routes.draw do
  devise_for :users

  root :to => "user#show"
end