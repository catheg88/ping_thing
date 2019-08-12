json.extract! @message, :id, :from, :body
json.created_at @message.message_created_at
json.updated_at @message.message_updated_at
