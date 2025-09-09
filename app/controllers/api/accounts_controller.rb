class API::AccountsController < API::BaseController
  def index
    render json: user.accounts.all
  end

  def show
    render json: account
  end

  def default
    render json: user.default_account
  end

  def not_found
    render json: { error: { message: "Account not found" } }, status: :not_found
  end

  protected

  def account
    @account ||= user.accounts.find_by!(number: params[:id])
  end
end
