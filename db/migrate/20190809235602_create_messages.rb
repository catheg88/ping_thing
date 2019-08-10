class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.belongs_to :conversation, index: true
      t.integer :user_id
      t.text :body
      t.boolean :read, default: false

      t.timestamps
    end
  end
end
