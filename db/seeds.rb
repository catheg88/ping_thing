# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'alex', email: 'alex@test.com', password: 'password', password_confirmation: 'password')
User.create(username: 'taylor', email: 'taylor@test.com', password: 'password', password_confirmation: 'password')

Conversation.create(user_id: 1, subject: "this is a's message thread", created_at: '2019-08-10 19:12:33', updated_at: '2019-08-10 19:12:33')
Message.create(conversation_id: 1, user_id: 1, body: "a's 1st message", created_at: '2019-08-10 19:12:33', updated_at: '2019-08-10 19:12:33')
Message.create(conversation_id: 1, user_id: 2, body: "t's reply is the 2nd message in this thread", created_at: '2019-08-11 04:12:45', updated_at: '2019-08-11 04:12:45')
ConversationUser.create(conversation_id: 1, user_id: 2)
ConversationUser.create(conversation_id: 1, user_id: 1)

Conversation.create(user_id: 2, subject: "this is t's message thread", created_at: '2019-08-06 01:04:44', updated_at: '2019-08-06 01:04:44')
Message.create(conversation_id: 2, user_id: 2, body: "t's 1st message", created_at: '2019-08-06 01:04:44', updated_at: '2019-08-06 01:04:44')
ConversationUser.create(conversation_id: 2, user_id: 1)
ConversationUser.create(conversation_id: 2, user_id: 2)
