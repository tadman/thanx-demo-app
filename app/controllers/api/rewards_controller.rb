class API::RewardsController < API::BaseController
  def index
    # NOTE: No pagination here for now, but this would be necessary in a real app
    render json: Reward.published.order(points: :desc).all
  end

  def show
    render json: reward
  end

  def redeem
    account.redeem_reward!(reward)

    render json: reward

  rescue AccountTransaction::InsufficientPoints
    render json: { error: { message: "Insufficient points" } }, status: :unprocessable_entity
  end

  protected

  def reward
    @reward ||= Reward.find(params[:id])
  end
end
