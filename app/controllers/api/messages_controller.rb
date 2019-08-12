class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = Conversation.find(params[:conversation_id]).messages.order(updated_at: :desc)
  end

  def create
    puts params

    # save conversation message
    message = Message.new(
      conversation_id: params[:conversation_id],
      user_id: current_user.id,
      body: params[:message]
    )
    if message.save
      puts "message saved"
    else
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    # set the conversation's 'updated_at' time so it sorts to the top
    Conversation.find(params[:conversation_id]).touch

  end
end
