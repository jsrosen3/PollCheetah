class VotesController < ApplicationController
  def create
    message = params[:Body]
    phone_number = params[:From]
    answer = Answer.find_by_id(message.to_i - 111) # so answer ids aren't quite public
    if answer && !already_voted_on_this_question?(phone_number, answer.question)
      @vote = Vote.new(:answer_id => answer.id, :phone_number => phone_number)
      @vote.save
      update_results_on_page(answer.question.poll)
      reply = "Your vote has been counted. Thanks! -- PollCheetah"
    elsif answer # valid answer code, but the user has already voted on this question
      reply = "Sorry, you can only vote once per question! -- PollCheetah"
    else # invalid answer code
      reply = "Invalid code. Please try again. -- PollCheetah"
    end
    text = send_response(reply)
    render :text => text
  end

  private

  def already_voted_on_this_question?(phone_number, question) # should optimize later
    question.answers.each do |answer|
      answer.votes.each do |vote|
        return true if vote.phone_number == phone_number
      end
    end
    false
  end

  def send_response(reply)
    twiml = Twilio::TwiML::Response.new { |r| r.Sms reply }
    return twiml.text
  end

  def update_results_on_page(poll)
    @poll = poll #need this so that RABL understands what I want it to render
    new_results = Rabl.render(@poll, "show", :view_path => 'app/views/polls', :format => :json)
    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger("#{poll.id}", 'new_vote', { :new_results => new_results })
  end
end
