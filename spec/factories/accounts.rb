FactoryBot.define do
  factory :account do
    user

    trait :with_points do
      after(:create) do |account|
        account.account_transactions.create(
          points: SecureRandom.random_number(10..100) * 100
        )
      end
    end
  end
end
