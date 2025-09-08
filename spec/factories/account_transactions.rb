FactoryBot.define do
  factory :account_transaction do
    account
    reward

    points { reward.points }
  end
end
