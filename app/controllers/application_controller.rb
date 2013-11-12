class ApplicationController < ActionController::Base
  include SessionsHelper

  protect_from_forgery
  before_filter :get_polls_for_user
  

  def get_polls_for_user
    if current_user
      @polls = current_user.polls.includes(:questions => [:answers => [:votes]])
    end
  end
end