json.array!(@conversations) do |conversation|
  json.id conversation["id"]
  json.subject conversation["subject"]
  json.participants conversation["participants"]
  json.created_at conversation["created_at"]
  json.updated_at conversation["updated_at"]
end
