# frozen_string_literal: true

user = User.find_or_create_by!(
  email: "test@example.com"
) do |user|
  user.password = "example"
end

account = Account.find_or_create_by!(
  user:,
  number: "2025-123456"
) do |account|
  account.account_transactions.build(
    points: 10_000
  )
end

[
  {
    title: "5lb Bag of Coffee",
    description: "Programmer fuel",
    url: "https://example.com/",
    points: 100
  }
].each do |reward|
  Reward.find_or_create_by!(title: reward[:title]) do |record|
    record.attributes = reward

    unless reward[:published] === false
      record.published_at = Time.now
    end
  end
end
