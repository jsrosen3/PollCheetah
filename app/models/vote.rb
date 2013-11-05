class Vote < ActiveRecord::Base
  attr_accessible :phone_number, :answer_id

  validates :phone_number, :answer_id, :presence => true

  belongs_to :answer

end
