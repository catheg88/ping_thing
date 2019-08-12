# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

PingThing is a messaging app with a single page React / Redux frontend and a Rails 5 backend.



Here are some reasons it's cool:
* Clean data model that scales well. Database indexes for fast lookups and validations. No silly nonsense like duplicating conversation/message records for each user, storing message recipient IDs in an array and trying to use them for lookups, etc.
* Data is stored in the client Redux state once it's been fetched, minimizing unnecessary database queries
* Real

# Data model overview

* `Conversation` records belong to a `user` (the creator) and a conversation `subject`
* `Message` records store the message `body` text, the author's `user_id`, and a `conversation_id` so they know which conversation they belong to
* `Conversation`s are associated with users through a `ConversationUser` table, which stores pairs of `user_id`s and `conversation_id`s. The user and their conversation models are linked by a `has many... through` association through this table.
* `User`s are Devise users. Kinda

Additional indexes in the database ensure speedy:
* Database queries (finding a `User`'s `Conversation`s and finding a `Conversation`'s `User`s)
* Validations (e.g. confirming uniqueness of `ConversationUser` records)

See `db/schema.rb` for the comprehensive database structure.
