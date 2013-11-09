class RemoveTextCodeFromAnswers < ActiveRecord::Migration
  def change
    remove_column :answers, :text_code
  end
end