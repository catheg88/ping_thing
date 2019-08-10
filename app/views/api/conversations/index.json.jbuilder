json.array!(@conversations) do |conversation|
  json.id conversation.id
  json.subject conversation.subject
end

# json.extract! @conversations, :id, :subject;
