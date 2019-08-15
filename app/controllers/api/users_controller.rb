class Api::UsersController < ApplicationController
  def index
    User.all.each do |user|
      puts user.id
      puts user.username
      puts user.email
    end

    @users = User.all
  end
end
