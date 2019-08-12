class ConversationUser < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  validates :user, uniqueness: { scope: :conversation }
end
