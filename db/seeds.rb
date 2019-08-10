# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: 'a@test.com', password: 'password', password_confirmation: 'password')
User.create(email: 'b@test.com', password: 'password', password_confirmation: 'password')

Conversation.create(user_id: 1, subject: "this is a's message thread")
Message.create(conversation_id: 1, user_id: 1, body: "a's 1st message", read: false)
Message.create(conversation_id: 1, user_id: 2, body: "b's reply is the 2nd message in this thread", read: false)
ConversationUser.create(conversation_id: 1, user_id: 2)
ConversationUser.create(conversation_id: 1, user_id: 1)

Conversation.create(user_id: 2, subject: "this is b's message thread")
Message.create(conversation_id: 2, user_id: 2, body: "b's 1st message", read: false)
ConversationUser.create(conversation_id: 2, user_id: 1)
ConversationUser.create(conversation_id: 2, user_id: 2)
