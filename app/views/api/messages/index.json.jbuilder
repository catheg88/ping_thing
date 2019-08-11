json.array!(@messages) do |message|
  json.id message.id
  json.from message.from
  json.body message.body
  json.created_at message.message_created_at
  json.updated_at message.message_updated_at
end
