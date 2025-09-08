describe AccountTransaction do
  describe "can be created" do
    it "from a factory" do
      expect(build(:account_transaction)).to be_valid
    end

    it "to add points to an account" do
      account = create(:account)
      reward = create(:reward, points: 10)

      expect do
        account.account_transactions.create(
          reward:,
          points: reward.points
        )
      end.to change { account.points }.by(reward.points)
    end

    it "by creating an association" do
      account = create(:account, :with_points)
      reward = create(:reward, points: 10)

      expect do
        transaction = account.account_transactions.create(
          reward:,
          points: -reward.points
        )

        expect(transaction).to have_persisted

        expect(transaction).to be_points
        expect(transaction.reward).to eq(reward)

        expect(account.points)
      end.to change { account.points }.by(-reward.points)
    end
  end

  describe "when redeeming a reward" do
    it "raises an error if the account has insufficient points" do
      account = create(:account, :with_points)
      reward = create(:reward, points: account.points + 1)

      expect do
        expect { AccountTransaction.atomic_redeem!(account, reward) }.to raise_error(AccountTransaction::InsufficientPoints)
      end.to_not change { account.points }
    end

    it "succeeds if the account has sufficient points" do
      account = create(:account, :with_points)
      reward = create(:reward, points: account.points)

      expect { AccountTransaction.atomic_redeem!(account, reward) }.to change { account.points }.by(-reward.points)
    end
  end
end
