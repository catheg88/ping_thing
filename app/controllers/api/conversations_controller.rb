class Api::ConversationsController < ApplicationController
  def index
    @conversations = User.find(1).conversations.all
  end
end
