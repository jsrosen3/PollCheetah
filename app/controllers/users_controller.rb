class UsersController < ApplicationController
  def show
    @user = User.find_by_id(params[:id]) # is this line necessary?

    render :show
  end
end