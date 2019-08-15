class Api::UsersController < ApplicationController
  def index
    @users = User.all.order(:username)
  end
end
