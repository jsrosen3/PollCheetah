class ChangeColumnTypeOfPhoneNumber < ActiveRecord::Migration
  def change
    change_column :votes, :phone_number, :string
  end
end
