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
  end

  def create
    conversation = Conversation.new({
      user_id: current_user.id,
      subject: params[:subject]
    })

    if conversation.save
      puts 'yes! it saved!'
    else
      puts conversation.errors.full_messages
      @errors = conversation.errors.full_messages
      render "api/shared/error", status: 422
    end


  end

end
