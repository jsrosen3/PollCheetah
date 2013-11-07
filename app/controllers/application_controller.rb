class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :get_polls_for_user

  def after_sign_in_path_for(resource)
    user_url(current_user)
  end

  def get_polls_for_user
    if current_user
      @polls = current_user.polls.includes(:questions => [:answers => [:votes]])
    end
  end
end