class Conversation < ApplicationRecord
  has_many :conversation_users
  has_many :users, through: :conversation_users
  has_many :messages, dependent: :destroy

  validates :subject, presence: true

  # after_create :notify_pusher, on: :create

  # def notify_pusher
  #   Pusher.trigger('chat', 'new', self.as_json)
  # end

  def conversation_created_at
    created_at.strftime("%-m/%-d/%y, %-l:%M %p")
  end

  def conversation_updated_at
    updated_at.strftime("%-m/%-d/%y, %-l:%M %p")
  end
end
