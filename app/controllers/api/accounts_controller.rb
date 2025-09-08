class API::AccountsController < API::BaseController
  def index
    render json: user.accounts.all
  end

  def show
    render json: account
  end

  protected

  def account
    @account ||= Account.find_by(number: params[:id])
  end
end
