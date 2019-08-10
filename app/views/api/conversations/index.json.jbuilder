json.array!(@conversations) do |conversation|
  json.id conversation["id"]
  json.subject conversation["subject"]
  json.participants conversation["participants"]
end
