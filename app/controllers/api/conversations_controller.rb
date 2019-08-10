class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @conversations = User.find(current_user.id).conversations.all
  end

end
