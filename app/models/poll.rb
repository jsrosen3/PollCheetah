class Poll < ActiveRecord::Base
  attr_accessible :user_id, :title, :questions_attributes

  validates :user_id, :title, :presence => true

  belongs_to :user
  has_many :questions, :dependent => :destroy

  accepts_nested_attributes_for :questions

  def as_json(options)
    super(:include => [:questions => [:answers]])
  end

end
