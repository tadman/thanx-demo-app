# frozen_string_literal: true

class AccountTransaction < ApplicationRecord
  belongs_to :account
  belongs_to :reward,
    optional: true

  class InsufficientPoints < StandardError; end

  # Attempts points redemption to claim a reward. Returns true on succes, or
  # raises InsufficientPoints if the points balance is insufficient.
  def self.atomic_redeem!(account, reward)
    result = nil

    # Performed as an atomic insertion where this query either succeeds and
    # creates the row, or fails to insert at all. This prevents over-spending,
    # from the introduction of race conditions.
    sql = <<~SQL
      INSERT INTO account_transactions (account_id, reward_id, points, created_at, updated_at)
        SELECT $1, $2, -$3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        WHERE (
          COALESCE((SELECT SUM(points) FROM account_transactions WHERE account_id = $1), 0)
          + $3
        ) >= 0
        RETURNING id
    SQL

    binds = [
      account.id, reward.id, reward.points
    ]

    rows = ApplicationRecord.connection.exec_query(sql, "AtomicRedeem", binds).to_a

    # Makes the fault clear by raising an exception instead of a result that
    # could be casually ignored.
    raise InsufficientPoints if rows.empty?

    true
  end
end
