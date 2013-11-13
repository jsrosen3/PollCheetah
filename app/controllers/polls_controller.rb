class PollsController < ApplicationController
  def create
    params[:poll][:questions_attributes] = params[:questions_attributes]
    @poll = Poll.new(params[:poll])
    @poll.user_id = current_user.id
    if @poll.save
      render :show
    else
      render :json => @poll.errors.full_messages, :status => 422
    end
  end

  def index
    @polls = Poll.includes(:questions => [:answers => [:votes]]).where(:user_id => current_user.id)
    render :index
  end

  def show # this is the poll results page
    @poll = Poll.includes(:questions => [:answers => [:votes]]).find(params[:id])
  end
end