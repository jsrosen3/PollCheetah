class Poll < ActiveRecord::Base
  attr_accessible :user_id, :title

  validates :user_id, :title, :presence => true

  belongs_to :user
  has_many :questions, :dependent => :destroy

end
