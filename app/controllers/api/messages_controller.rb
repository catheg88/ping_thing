class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = Conversation.find(params[:conversation_id]).messages.order(updated_at: :desc)
  end
end
