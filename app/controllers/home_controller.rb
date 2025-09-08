class HomeController < ApplicationController
  def index
    if user_signed_in?
      render :logged_in
    else
      render :logged_out
    end
  end
end
