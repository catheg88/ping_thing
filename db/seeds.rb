# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

User.create(username: 'alex', email: 'alex@test.com', password: 'password', password_confirmation: 'password')
User.create(username: 'taylor', email: 'taylor@test.com', password: 'password', password_confirmation: 'password')
User.create(username: 'stacie', email: 'stacie@test.com', password: 'password', password_confirmation: 'password')
User.create(username: 'demo', email: 'demo@test.com', password: 'password', password_confirmation: 'password')

Conversation.create(user_id: 1, subject: "this is alex's message thread", created_at: '2019-08-10 19:12:33', updated_at: '2019-08-10 19:12:33')
Message.create(conversation_id: 1, user_id: 1, body: "alex's 1st message", created_at: '2019-08-10 19:12:33', updated_at: '2019-08-10 19:12:33')
Message.create(conversation_id: 1, user_id: 2, body: "taylor's reply is the 2nd message in this thread", created_at: '2019-08-11 04:12:45', updated_at: '2019-08-11 04:12:45')
ConversationUser.create(conversation_id: 1, user_id: 2)
ConversationUser.create(conversation_id: 1, user_id: 1)

Conversation.create(user_id: 2, subject: "this is taylor's message thread", created_at: '2019-08-06 01:04:44', updated_at: '2019-08-06 01:04:44')
Message.create(conversation_id: 2, user_id: 2, body: "t's 1st message", created_at: '2019-08-06 01:04:44', updated_at: '2019-08-06 01:04:44')
ConversationUser.create(conversation_id: 2, user_id: 1)
ConversationUser.create(conversation_id: 2, user_id: 2)
ConversationUser.create(conversation_id: 2, user_id: 3)

Conversation.create(user_id: 3, subject: "this is stacie's message thread", created_at: '2019-06-26 04:54:25', updated_at: '2019-06-26 04:54:25')
Message.create(conversation_id: 3, user_id: 3, body: "stacie is alive", created_at: '2019-06-26 04:54:25', updated_at: '2019-06-26 04:54:25')
ConversationUser.create(conversation_id: 3, user_id: 1)
ConversationUser.create(conversation_id: 3, user_id: 2)
ConversationUser.create(conversation_id: 3, user_id: 3)

Conversation.create(user_id: 4, subject: "demo's conversation", created_at: '2019-06-26 04:54:25', updated_at: '2019-06-26 04:54:25')
Message.create(conversation_id: 4, user_id: 4, body: "demo demo", created_at: '2019-06-26 04:54:25', updated_at: '2019-06-26 04:54:25')
ConversationUser.create(conversation_id: 4, user_id: 1)
ConversationUser.create(conversation_id: 4, user_id: 2)
ConversationUser.create(conversation_id: 4, user_id: 3)
ConversationUser.create(conversation_id: 4, user_id: 4)
