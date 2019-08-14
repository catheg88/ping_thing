class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    # ensure user is allowed to see response
    conversation = Conversation.find(params[:conversation_id])
    current_user_is_participant = false
    conversation.users.each do |u|
      if u.username == current_user.username
          current_user_is_participant = true
      end
    end

    if current_user_is_participant == true
      @messages = conversation.messages.order(updated_at: :desc)
    else
      @errors = "Current user does not have access to this conversation's messages."
      render "api/shared/error", status: 401
    end

  end

  def show
    # ensure user is allowed to see response
    conversation_users = Message.find(params[:id]).conversation.users
    current_user_is_participant = false
    conversation_users.each do |u|
      if u.username == current_user.username
          current_user_is_participant = true
      end
    end

    if current_user_is_participant == true
      @message = Message.find(params[:id])
    else
      @errors = "Current user does not have access to this message's conversation."
      render "api/shared/error", status: 401
    end
  end

  def create
    # save conversation message
    message = Message.new(
      conversation_id: params[:conversation_id],
      user_id: current_user.id,
      body: params[:message]
    )
    if message.save
      puts "Message saved"
    else # TODO: error handling for other controllers
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    # update conversation's 'updated_at' time
    conversation = Conversation.find(params[:conversation_id])
    conversation.touch
    # decide who needs to know and send pusher update
    interested_users = []
    conversation.users.each do |u|
      interested_users << u.id
    end
    puts interested_users

    Pusher.trigger('ping_channel', 'update', {
      message: 'new_message',
      interested_users: interested_users,
      message_id: message.id,
      conversation_id: conversation.id
    })
  end

end
