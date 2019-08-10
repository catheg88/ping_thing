json.array!(@messages) do |message|
  json.id message.id
  json.user_id message.user_id
  json.body message.body
  json.read message.read
  json.created message.created_at
end
