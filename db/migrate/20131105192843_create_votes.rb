class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :phone_number
      t.integer :answer_id

      t.timestamps
    end

    add_index :votes, :phone_number
    add_index :votes, :answer_id
  end
end
