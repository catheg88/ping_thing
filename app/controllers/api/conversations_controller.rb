class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations_records = User.find(current_user.id).conversations.all
    @conversations = []
    conversations_records.each do |c|
      conversation = {}
      conversation["id"] = c.id
      conversation["subject"] = c.subject
      conversation["participants"] = []
      c.users.each do |u|
        conversation["participants"] << u.email
      end

      @conversations << conversation
    end


  end

end
