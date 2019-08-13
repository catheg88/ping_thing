class Api::ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations_records = User.find(current_user.id).conversations.all.order(updated_at: :desc)

    # calculate and add a 'participants' field to the api response
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
        conversation["participants"] << u.username
      end
      @conversations << conversation
    end
  end

  def show
    # ensure user is allowed to see response
    conversation = Conversation.find(params[:id])
    current_user_is_participant = false
    conversation.users.each do |u|
      if u.username == current_user.username
          current_user_is_participant = true
      end
    end

    if current_user_is_participant == true
      @conversation = {
        "id" => conversation.id,
        "subject" => conversation.subject,
        "participants" => [],
        "created_at" => conversation.conversation_created_at,
        "updated_at" => conversation.conversation_updated_at
      }
      conversation.users.each do |u|
        @conversation["participants"] << u.username
      end
    else
      @errors = "Current user does not have access to this conversation."
      render "api/shared/error", status: 401
    end

  end

  def create

    conversation = Conversation.new(
      user_id: current_user.id,
      subject: params[:subject]
    )
    if conversation.save
      puts 'Conversation saved'
    else
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    # save conversation assoc with creator
    owner_user_assoc = ConversationUser.new(
      conversation_id: conversation.id,
      user_id: current_user.id
    )
    if owner_user_assoc.save
      puts "Owner \"#{current_user.username}\" association saved"
    else
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    # save conversation assoc with other users
    params[:to].split(' ').each do |u| # TODO: update this
      if User.find_by(username: u)
        recipient_user_assoc = ConversationUser.new(
          conversation_id: conversation.id,
          user_id: User.find_by(username: u).id
        )
        if recipient_user_assoc.save
          puts "Recipient \"#{u}\" association saved"
        else
          @errors = message.errors.full_messages
          render "api/shared/error", status: 422
        end
      else
        puts "user \"#{u}\" not found"
      end
    end

    # save conversation message
    message = Message.new(
      conversation_id: conversation.id,
      user_id: current_user.id,
      body: params[:message]
    )
    if message.save
      puts "Message saved"
    else
      @errors = message.errors.full_messages
      render "api/shared/error", status: 422
    end

    # decide who needs to know and send pusher update
    interested_users = []
    conversation.users.each do |u|
      interested_users << u.id
    end

    Pusher.trigger('ping_channel', 'update', {
      message: 'new_conversation',
      interested_users: interested_users,
      conversation_id: conversation.id
    })
  end

end
