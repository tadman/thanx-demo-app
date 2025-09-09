class API::RewardsController < API::BaseController
  def index
    redeemed_rewards = Set.new(account.redeemed_rewards.pluck(:id).uniq)

    # NOTE: No pagination here for now, but this would be necessary in a real app
    render json: Reward.published.order(points: :desc).all.map do |reward|
      # Injecting contextual information about the relationship of this reward and this account
      reward.as_json.merge(
        redeemed: redeemed_rewards.include?(reward.id)
      )
    end
  end

  def show
    render json: reward
  end

  def redeem
    account = user.default_account

    transaction_id = account.redeem_reward!(reward)

    render json: {
      account:,
      transaction: account.account_transactions.find(transaction_id)
  }

  rescue AccountTransaction::InsufficientPoints
    render json: { error: { message: "Insufficient points" } }, status: :unprocessable_entity
  end

  protected

  def account
    @account ||= user.default_account
  end

  def reward
    @reward ||= Reward.find(params[:id])
  end
end
