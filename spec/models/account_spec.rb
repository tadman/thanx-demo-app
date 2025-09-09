describe Account do
  describe "can be created" do
    it "for a given user" do
      user = create(:user)

      account = user.accounts.create

      expect(account).to have_persisted
      expect(account).to be_number

      expect(user.accounts.pluck(:id)).to include(account.id)
    end

    it "from a factory" do
      expect(build(:account)).to be_valid
    end
  end

  describe "can have many redeemed rewards" do
    it "through account transactions" do
      account = create(:account, :with_points)
      reward = create(:reward, points: account.points)

      account.redeem_reward!(reward)

      expect(account.redeemed_rewards).to include(reward)

      expect(account.redeemed_rewards.count).to eq(1)
    end
  end
end
