class UsersController < ApplicationController
  def show
    @user = current_user
    @polls = @user.polls.includes(:questions => [:answers => [:votes]])

    render :show
  end
end