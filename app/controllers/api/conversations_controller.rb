class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations_records = User.find(current_user.id).conversations.all
    @conversations = []
    conversations_records.each do |c|
      conversation = {
        "id" => c.id,
        "subject" => c.subject,
        "participants" => []
      }
      c.users.each do |u|
        conversation["participants"] << u.email
      end
      @conversations << conversation
    end

    def create # post to endpoint to create new conversation

    end

  end

end
