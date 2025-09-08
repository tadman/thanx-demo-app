# frozen_string_literal: true

require_relative "../rails_helper"

describe User do
  describe "can be created" do
    it "given minimal attributes" do
      user = User.create(
        email: "test@example.com",
        password: "example"
      )

      expect(user).to have_persisted
    end

    it "using a factory" do
      expect(build(:user)).to be_valid
    end
  end

  describe "can have many accounts" do
    it "after creation" do
      user = create(:user)

      expect(user.accounts.count).to eq(0)

      user.accounts.create

      expect(user.accounts.count).to eq(1)
    end
  end
end
