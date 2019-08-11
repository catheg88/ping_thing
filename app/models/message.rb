class Message < ApplicationRecord
  belongs_to :conversation

  def message_time
    created_at.strftime("%-d/%-m/%y at %-l:%M %p")
  end
end
