class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me

  has_many :polls, :dependent => :destroy

  def self.generate_guest_credentials
    pass = SecureRandom.urlsafe_base64
    u = User.create({ :email => "#{Time.now.to_i}#{rand(99)}@example.com", 
                      :password => pass, 
                      :password_confirmation => psss
                    })

    generate_sample_poll(user.id)
    u
  end

  private

  def generate_sample_poll(user_id)
    poll = Poll.create({
      :user_id => user_id, :title => "Sample Poll", :questions_attributes => [{
        :text => "What is the best ice cream flavor?", :answers_attributes => [
          {:text => "Vanilla"}, 
          {:text => "Chocolate"}, 
          {:text => "Strawberry"}
        ]
      }]
    }) 

    generate_votes(poll)
  end

  def generate_votes(poll)
    poll.questions.includes(:answers).each do |question|
      question.answers.each do |answer|
        Vote.create({ :answer_id => answer.id, :phone_number => "abc" })
      end
    end
  end

end