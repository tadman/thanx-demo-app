class API::UsersController < API::BaseController
  def show
    render json: current_user
  end
end
