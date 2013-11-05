class Question < ActiveRecord::Base
  attr_accessible :poll_id, :text

  validates :poll_id, :text, :presence => true

  belongs_to :poll
  has_many :answers, :dependent => :destroy
  
end
