class AddUserTypeToTable < ActiveRecord::Migration
  def change
    add_column :users, :user_type, :string, :default => "guest"
  end
end