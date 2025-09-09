require "rails_helper"

RSpec.describe "API::Users", type: :request do
  describe "GET /api/user" do
    it "returns unauthorized when not signed in" do
      get "/api/user"

      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)).to include("error" => include("message" => "Unauthorized"))
    end

    it "returns current user when signed in" do
      user = create(:user)

      sign_in user

      get "/api/user"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)

      expect(json).to include(
        "id" => user.id,
        "email" => user.email
      )
    end
  end
end
