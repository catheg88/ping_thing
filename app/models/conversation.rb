class Conversation < ApplicationRecord
  has_many :conversation_users
  has_many :users, through: :conversation_users
  has_many :messages, dependent: :destroy

  validates :subject, presence: true

  def conversation_created_at
    created_at.localtime.strftime("%-m/%-d/%y, %-l:%M %p")
  end

  def conversation_updated_at
    updated_at.localtime.strftime("%-m/%-d/%y, %-l:%M %p")
  end
end
