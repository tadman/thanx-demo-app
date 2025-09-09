require "rails_helper"

RSpec.describe "API::Rewards redeem", type: :request do
  describe "POST /api/rewards/:id/redeem" do
    it "returns 401 when not signed in" do
      reward = create(:reward, published_at: Time.current)

      get "/"

      token = (
        response.body[/<meta name=\"csrf-token\" content=\"([^\"]+)\"/, 1] ||
        response.body[/content=\"([^\"]+)\" name=\"csrf-token\"/, 1]
      )

      post "/api/rewards/#{reward.id}/redeem", headers: { "X-CSRF-Token" => token, "Accept" => "application/json" }

      expect(response).to have_http_status(:unauthorized)
    end

    it "redeems when account has sufficient points" do
      user = create(:user)
      account = create(:account, user: user)
      reward = create(:reward, points: 100, published_at: Time.current)
      account.account_transactions.create!(points: 200) # fund account

      sign_in user
      get "/"
      token = (
        response.body[/<meta name=\"csrf-token\" content=\"([^\"]+)\"/, 1] ||
        response.body[/content=\"([^\"]+)\" name=\"csrf-token\"/, 1]
      )
      post "/api/rewards/#{reward.id}/redeem", headers: { "X-CSRF-Token" => token, "Accept" => "application/json" }
      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json).to include("account", "transaction")
      expect(json.fetch("transaction")).to include("points" => -reward.points)
    end

    it "returns 422 when insufficient points" do
      user = create(:user)
      create(:account, user: user) # zero points
      reward = create(:reward, points: 100, published_at: Time.current)

      sign_in user
      get "/"
      token = (
        response.body[/<meta name=\"csrf-token\" content=\"([^\"]+)\"/, 1] ||
        response.body[/content=\"([^\"]+)\" name=\"csrf-token\"/, 1]
      )
      post "/api/rewards/#{reward.id}/redeem", headers: { "X-CSRF-Token" => token, "Accept" => "application/json" }

      expect(response).to have_http_status(:unprocessable_content)

      expect(JSON.parse(response.body)).to include(
        # Phrasing is locked in for the moment
        "error" => include("message" => "Insufficient points")
      )
    end
  end
end
