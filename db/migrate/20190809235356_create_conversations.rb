class CreateConversations < ActiveRecord::Migration[5.1]
  def change
    create_table :conversations do |t|
      t.integer :user_id
      t.string :subject

      t.timestamps
    end
  end
end
