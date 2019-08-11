class Message < ApplicationRecord
  belongs_to :conversation

  def message_created_at
    created_at.strftime("%-m/%-d/%y, %-l:%M %p")
  end

  def message_updated_at
    updated_at.strftime("%-m/%-d/%y, %-l:%M %p")
  end

  def from
    User.find(user_id).email
  end
end
