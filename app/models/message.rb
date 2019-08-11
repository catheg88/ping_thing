class Message < ApplicationRecord
  belongs_to :conversation

  def message_time
    created_at.strftime("%-m/%-d/%y, %-l:%M %p")
  end

  def from
    User.find(user_id).email
  end
end
