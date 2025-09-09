require "rails_helper"

RSpec.describe "API::Accounts", type: :request do
  describe "GET /api/accounts" do
    it "returns unauthorized when not signed in" do
      get "/api/accounts"

      expect(response).to have_http_status(:unauthorized)
    end

    it "lists only the authorized user's accounts" do
      user = create(:user)
      alternate = create(:user)

      primary_account = create(:account, user:)
      _alternate_account = create(:account, user: alternate)

      sign_in user

      get "/api/accounts"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to be_a(Array)

      numbers = json.map { |h| h.fetch("number") }

      expect(numbers).to contain_exactly(primary_account.number)
    end
  end

  describe "GET /api/accounts/default" do
    it "returns unauthorized when not signed in" do
      get "/api/accounts/default"

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns the default account when signed in" do
      user = create(:user)
      _account = create(:account, user: user)

      sign_in user

      get "/api/accounts/default"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to include(
        "number" => user.default_account.number
      )
    end
  end

  describe "GET /api/accounts/:id" do
    it "returns unauthorized when not signed in" do
      account = create(:account)

      get "/api/accounts/#{account.number}"

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns not found when accessing another user's account" do
      user = create(:user)
      alternate = create(:user)

      account = create(:account, user: alternate)

      sign_in user

      get "/api/accounts/#{account.number}"

      expect(response).to have_http_status(:not_found)
    end

    it "returns the account (by number) when signed in" do
      user = create(:user)
      account = create(:account, user: user)

      sign_in user

      get "/api/accounts/#{account.number}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to include(
        "number" => account.number
      )
    end
  end
end
