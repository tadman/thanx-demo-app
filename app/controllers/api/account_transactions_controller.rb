class API::AccountTransactionsController < API::BaseController
  def index
    render json: account.account_transactions
  end

  protected

  def account
    @account ||= user.accounts.find(params[:account_id])
  end
end
