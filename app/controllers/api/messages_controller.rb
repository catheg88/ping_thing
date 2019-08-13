class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
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
      @errors = "Current user does not have access to conversation"
      render "api/shared/error", status: 401
    end

  end

  def show
    @message = Message.find(params[:id])

    puts 'Message.conversation'
    puts Message.conversation
  end

  def create
    # save conversation message
    message = Message.new(
      conversation_id: params[:conversation_id],
      user_id: current_user.id,
      body: params[:message]
    )
    if message.save
      puts "message saved"
    else # TODO: error handling for other controllers
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    conversation = Conversation.find(params[:conversation_id])
    # set the conversation's 'updated_at' time so it sorts to the top
    conversation.touch

    # find who needs to know and send pusher update
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
