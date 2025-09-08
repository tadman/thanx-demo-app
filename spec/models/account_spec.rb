describe Account do
  describe "can be created" do
    it "for a given user" do
      user = create(:user)

      account = user.accounts.create\

      expect(account).to have_persisted
      expect(account).to be_number

      expect(user.accounts.pluck(:id)).to include(account.id)
    end

    it "from a factory" do
      expect(build(:account)).to be_valid
    end
  end
end
