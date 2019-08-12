class AddUniquenessIndexToConversationUser < ActiveRecord::Migration[5.1]
  def change
    add_index :conversation_users, [:conversation_id, :user_id], unique: true
  end
end
