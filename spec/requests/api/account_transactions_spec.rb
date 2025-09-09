require "rails_helper"

RSpec.describe "API::AccountTransactions", type: :request do
  describe "GET /api/accounts/:account_id/account_transactions" do
    it "returns 401 when not signed in" do
      account = create(:account)

      get "/api/accounts/#{account.id}/account_transactions"

      expect(response).to have_http_status(:unauthorized)
    end

    it "lists transactions for the account in descending created order" do
      user = create(:user)
      account = create(:account, user:)

      reward_a = create(:reward, points: 100)
      reward_b = create(:reward, points: 200)

      # Force in thse transactions, don't worry about balances
      transactions = [
        account.account_transactions.create!(reward: reward_a, points: -reward_a.points, created_at: 1.hour.ago),
        account.account_transactions.create!(reward: reward_b, points: -reward_b.points, created_at: Time.current)
      ]

      sign_in user

      get "/api/accounts/#{account.id}/account_transactions"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      # Test that these are reported in the correct order
      expect(json.map { |h| h["id"] }).to eq(transactions.sort_by(&:created_at).reverse.map(&:id))
    end
  end
end
