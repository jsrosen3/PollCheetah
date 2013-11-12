class UsersController < ApplicationController
  before_filter :require_current_user!, :only => [:show]
  before_filter :require_no_current_user!, :only => [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      render :json => @user
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end

  def create_guest
    @user = User.generate_guest_credentials
    self.current_user = @user
    render :json => @user
  end

  def show
    @user = current_user
    @polls = @user.polls.includes(:questions => [:answers => [:votes]])

    render :show
  end
end
