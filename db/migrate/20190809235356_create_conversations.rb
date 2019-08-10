class CreateConversations < ActiveRecord::Migration[5.1]
  def change
    create_table :conversations do |t|
      t.integer :user_id
      t.string :subject
      t.integer :recipient_id, array: true

      t.timestamps
    end
  end
end
