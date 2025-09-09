class Account < ApplicationRecord
  belongs_to :user

  has_many :account_transactions,
    dependent: :destroy

  has_many :redeemed_rewards,
    class_name: "Reward",
    source: :reward,
    through: :account_transactions

  before_validation :assign_number,
    on: :create,
    unless: :number?

  def self.generate_number
    "%04d-%06d" % [
      SecureRandom.random_number(10000),
      SecureRandom.random_number(1000000)
    ]
  end

  def points
    account_transactions.sum(:points)
  end

  def can_redeem_reward?(reward)
    return false if reward.points > points

    true
  end

  def redeem_reward!(reward)
    AccountTransaction.atomic_redeem!(self, reward)
  end

  def as_json(*_options)
    {
      id:,
      number:,
      points:,
      default: user.default_account == self,
      created_at:,
      updated_at:
    }
  end

  protected

  def assign_number
    self.number = Account.generate_number
  end
end
