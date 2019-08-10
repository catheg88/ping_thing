class Api::MessagesController < ApplicationController
  def index
    @messages = Conversation.find(params[:conversation_id]).messages
  end
end
