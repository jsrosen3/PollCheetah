class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if @user.nil?
      render :json => "Credentials were wrong"
    else
      self.current_user = @user
      render :json => @user
    end
  end

  def destroy
    @user = current_user
    logout_current_user!
    @user.destroy if @user.user_type == "guest"
    redirect_to root_url
  end
end
