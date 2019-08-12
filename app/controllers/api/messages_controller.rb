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
    end

  end
end
