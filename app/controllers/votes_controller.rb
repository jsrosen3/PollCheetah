class VotesController < ApplicationController
  def create
    message = params[:Body]
    phone_number = params[:From]
    answer = Answer.find_by_text_code(message.to_i)
    if answer && !already_voted_on_this_question?(phone_number, answer.question)
      @vote = Vote.new(:answer_id => answer.id, :phone_number => phone_number)
      @vote.save
      reply = "Your vote has been counted. Thanks! -- PollCheetah"
    elsif answer # valid answer code, but the user has already voted on this question
      reply = "Sorry, you can only vote once per question! -- PollCheetah"
    else # invalid answer code
      reply = "Invalid code. Please try again. -- PollCheetah"
    end
    text = send_response(reply)
    render :text => text
    # client = Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_AUTH_TOKEN'])
    # client.account.sms.messages.create(from: ENV['TWILIO_PHONE'], to: phone_number, body: reply)
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
end