class API::BaseController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception
  before_action :set_default_format

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  protected

  def user
    @user ||= current_user
  end
end
