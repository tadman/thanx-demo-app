class Reward < ApplicationRecord
  has_many :account_transactions

  has_many :redeeming_accounts,
    class_name: "Account",
    through: :account_transactions

  # Rewards can be published to be visible to users
  scope :published, -> { where.not(published_at: nil) }
end
