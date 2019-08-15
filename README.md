# README

PingThing is a messaging app that combines the best parts of real-time chat (IRC) and email threads.

Try the demo [deployed on Heroku](https://pingthing.herokuapp.com/). Sign up or use the demo account:
un: 'demo'
pw: 'password'

PingThing is a single page React / Redux frontend and a Rails 5 backend. The frontend sends and retrieves data via a Rails JSON API.

Here are some ways it's cool:
* Data is stored in the client Redux state once it's been fetched from Rails, eliminating unnecessary database queries
* Interface receives real-time updates (incoming messages) using Pusher/websockets. Only affected users respond to each Pusher notification, and they grab only the new data they don't have from the database
* Clean data model that scales well. Database indexes for fast lookups and validations. No silly nonsense like duplicating conversation/message records for each user, storing message recipient IDs in an array and trying to use them for lookups, etc.
* API endpoint responses are restricted to only allow access to the current user's data. Stacie can't read Alex's message to Taylor.
* Responsive design to display well with many screen sizes
* "To" field only accepts recognized other users as message recipients

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

# Data model overview
* `Conversation` records belong to a `user` (the creator) and a conversation `subject`
* `Message` records store the message `body` text, the author's `user_id`, and a `conversation_id` so they know which conversation they belong to
* `Conversation`s are associated with users through a `ConversationUser` table, which stores pairs of `user_id`s and `conversation_id`s. The user and their conversation models are linked by a `has many... through` association through this table.
* `User`s are Devise users. Kinda boring.

Additional indexes in the database ensure speedy:
* Database queries (e.g. finding a `User`'s `Conversation`s and finding a `Conversation`'s `User`s)
* Validations (e.g. confirming uniqueness of `ConversationUser` records)

This is a summary only - see [db/schema.rb](db/schema.rb) for comprehensive database structure.
