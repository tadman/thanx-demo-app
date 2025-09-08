class API::AccountsController < API::BaseController
  def index
    render json: { accounts: user.accounts.all }
  end
end
