class API::BaseController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  before_action :validate_session

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  alias_method :user, :current_user

  protected

  def validate_session
    return if current_user

    render json: { error: { message: "Unauthorized" } }, status: :unauthorized
  end
end
