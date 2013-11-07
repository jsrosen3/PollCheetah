class PollsController < ApplicationController
  def create
    @poll = Poll.new(params[:poll])
    @poll.user_id = current_user.id
    if @poll.save
      render :json => @poll
    else
      render :json => @poll.errors.full_messages, :status => 422
    end
  end

  def index # this is the user page - lists all the user's polls
    @polls = current_user.polls.includes(:questions => [:answers => [:votes]])
    render :index
  end

  def show # this is the poll results page
    @poll = Poll.find(params[:id]).includes(:questions => [:answers => [:votes]])
    render :show
  end
end