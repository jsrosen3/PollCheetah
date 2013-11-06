class UsersController < ApplicationController
  def show
    render :show
  end

  def guest
    @user = create_guest_user
    p "USER USER USER"
    p @user
    p "USER USER USER"
    redirect_to user_url(@user)
  end

end