require "rails_helper"

RSpec.describe "API::Rewards", type: :request do
  describe "GET /api/rewards" do
    it "returns unauthorized when not signed in" do
      get "/api/rewards"

      expect(response).to have_http_status(:unauthorized)
    end

    it "lists published rewards ordered by points desc, includes redeemed flag" do
      user = create(:user)
      account = create(:account, user: user)

      inexpensive_reward = create(:reward, points: 100, published_at: Time.current)
      expensive_reward = create(:reward, points: 300, published_at: Time.current)

      account.account_transactions.create!(reward: inexpensive_reward, points: -inexpensive_reward.points)

      sign_in user

      get "/api/rewards"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json.map { |h| h["id"] }).to eq([ expensive_reward.id, inexpensive_reward.id ])

      low = json.detect { |h| h["id"] == inexpensive_reward.id }
      high = json.detect { |h| h["id"] == expensive_reward.id }

      expect(low).to include("redeemed" => true)
      expect(high).to include("redeemed" => false)
    end
  end

  describe "GET /api/rewards/:id" do
    it "returns unauthorized when not signed in" do
      reward = create(:reward, published_at: Time.current)

      get "/api/rewards/#{reward.id}"

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns the reward when signed in" do
      user = create(:user)
      _account = create(:account, user:)
      reward = create(:reward, published_at: Time.current)

      sign_in user

      get "/api/rewards/#{reward.id}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to include(
        "id" => reward.id,
        "points" => reward.points
      )
    end
  end
end
