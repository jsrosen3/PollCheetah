class User < ActiveRecord::Base
  attr_accessible :email, :password, :user_type
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true
  validates :email, :presence => true, :uniqueness => true;

  after_initialize :ensure_session_token

  has_many :polls, :dependent => :destroy

  def self.generate_guest_credentials
    u = User.new({ :email => "#{Time.now.to_i}#{rand(99)}@example.com" })
    u.password = SecureRandom.urlsafe_base64
    u.reset_session_token!
    u.save!
    u.generate_sample_poll(u.id)
    u
  end

  def generate_sample_poll(user_id)
    poll = Poll.create({
      :user_id => user_id, :title => "Sample Poll", :questions_attributes => [{
        :text => "What is the best ice cream flavor?", :answers_attributes => [
          {:text => "Vanilla"}, 
          {:text => "Chocolate"}, 
          {:text => "Strawberry"},
          {:text => "Other"}
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

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
  
end