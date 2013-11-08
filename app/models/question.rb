class Question < ActiveRecord::Base
  attr_accessible :poll_id, :text, :answers_attributes

  #validates :poll_id, :text, :presence => true

  belongs_to :poll
  has_many :answers, :dependent => :destroy

  accepts_nested_attributes_for :answers

  def as_json(options)
    super(:include => [:answers])
  end
  
end
