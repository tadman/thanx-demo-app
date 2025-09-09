class API::AccountTransactionsController < API::BaseController
  def index
    # FUTURE: Add pagination to split up resaults
    render json: account.account_transactions.order(created_at: :desc).all
  end

  protected

  def account
    @account ||= user.accounts.find(params[:account_id])
  end
end
