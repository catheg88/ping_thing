# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: 'a@test.com', password: 'password', password_confirmation: 'password')
User.create(email: 'b@test.com', password: 'password', password_confirmation: 'password')
Conversation.create(user_id: 1, subject: "this is a's")
Conversation.create(user_id: 2, subject: "this is b's")
ConversationUser.create(conversation_id: 1, user_id: 1)
ConversationUser.create(conversation_id: 2, user_id: 2)
