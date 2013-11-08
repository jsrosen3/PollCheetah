class PollsController < ApplicationController
  def create
    params[:poll][:questions_attributes] = params[:questions_attributes]
    @poll = Poll.new(params[:poll])
    @poll.user_id = current_user.id
    p @poll
    if @poll.save
      render :show
    else
      p @poll.errors.full_messages
      render :json => @poll.errors.full_messages, :status => 422
    end
  end

  def index
    @polls = Poll.includes(:questions => [:answers => [:votes]]) # maybe current_user.polls instead?
    render :index
  end

  def show # this is the poll results page
    @poll = Poll.includes(:questions => [:answers => [:votes]]).find(params[:id])
    p "yoyoyo"
    p @poll
    p "yoyoyo"
  end
end