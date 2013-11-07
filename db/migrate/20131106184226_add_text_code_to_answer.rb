class AddTextCodeToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :text_code, :integer
  end
end
