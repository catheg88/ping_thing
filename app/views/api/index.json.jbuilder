json.array!(@conversations) do |conversation|
  json.id restaurant.id
  json.name restaurant.name
  json.cuisine restaurant.cuisine
  json.hours restaurant.hours
  json.description restaurant.description
end
