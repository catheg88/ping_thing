# README

PingThing is a messaging app with a single page React / Redux frontend and a Rails 5 backend.

Here are some ways it's cool:
* React Redux frontend runs in a single static page served by the Rails backend. The frontend sends and receives data through a Rails JSON API
* Data is stored in the client Redux state once it's been fetched, minimizing unnecessary database queries
* Clean data model that scales well. Database indexes for fast lookups and validations. No silly nonsense like duplicating conversation/message records for each user, storing message recipient IDs in an array and trying to use them for lookups, etc.
* Real-time updates to receive messages using Pusher

# Installation
This app was built using
* Rails `v5.1.7`
* Ruby `v2.6.3p62`
* Postgres `v9.5.1.0`
* npm `v6.7.0`

To install:
* Clone this repo:
`git clone https://github.com/catheg88/ping_thing`
* `cd` into the root app directory:
`cd ping_thing`
* Install the frontend javascript dependencies with `npm`:
`npm install`
* TODO: SETUP DB
* TODO: CREATE USERS

# Data model summary

* `Conversation` records belong to a `user` (the creator) and a conversation `subject`
* `Message` records store the message `body` text, the author's `user_id`, and a `conversation_id` so they know which conversation they belong to
* `Conversation`s are associated with users through a `ConversationUser` table, which stores pairs of `user_id`s and `conversation_id`s. The user and their conversation models are linked by a `has many... through` association through this table.
* `User`s are Devise users. Kinda boring.

Additional indexes in the database ensure speedy:
* Database queries (e.g. finding a `User`'s `Conversation`s and finding a `Conversation`'s `User`s)
* Validations (e.g. confirming uniqueness of `ConversationUser` records)

This is a summary only - see [db/schema.rb](db/schema.rb) for comprehensive database structure.

# TODO: Things you may want to cover:
* Configuration
* Database creation
* Database initialization
