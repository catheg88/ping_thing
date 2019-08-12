class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations_records = User.find(current_user.id).conversations.all.order(updated_at: :desc)
    @conversations = []
    conversations_records.each do |c|
      conversation = {
        "id" => c.id,
        "subject" => c.subject,
        "participants" => [],
        "created_at" => c.conversation_created_at,
        "updated_at" => c.conversation_updated_at
      }
      c.users.each do |u|
        conversation["participants"] << u.email
      end
      @conversations << conversation
    end

  end

  def create
    logs = []
    conversation = Conversation.new(
      user_id: current_user.id,
      subject: params[:subject]
    )
    if conversation.save
      # puts 'conversation saved'
      logs << 'conversation saved'
    end

    # save conversation assoc with creator
    owner_user_assoc = ConversationUser.new(
      conversation_id: conversation.id,
      user_id: current_user.id
    )
    if owner_user_assoc.save
      # puts 'owner user associated'
      logs << 'owner user associated'
    end

    # save conversation assoc with other users, taken from parsing the 'to' line
    params[:to].split(' ').each do |user|
      if User.find_by(email: user)
        recipient_user_assoc = ConversationUser.new(
          conversation_id: conversation.id,
          user_id: User.find_by(email: user).id
        )

        if recipient_user_assoc.save
          # puts "recipient_user_assoc saved"
          logs << "recipient_user_assoc saved"
        end
      end
    end

    # save conversation message
    message = Message.new(
      conversation_id: conversation.id,
      user_id: current_user.id,
      body: params[:message]
    )
    if message.save
      # puts "message saved"
      logs << "message saved"
    end

    puts logs
    # else
    #   @errors = conversation.errors.full_messages
    #   render "api/shared/error", status: 422
    # end

    # package up who needs to know and send pusher update
    interested_users = []
    conversation.users.each do |u|
      interested_users << u.id
    end

    Pusher.trigger('ping_channel', 'update', {
      message: 'new_conversation',
      interested_users: interested_users
    })
  end

end
