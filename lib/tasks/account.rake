# frozen_string_literal: true

namespace :account do
  desc "List all accounts and balances"
  task list: :environment do
    Account.order(:number).includes(:user).all.each do |account|
      puts "%-9s %10d %14s %s" % [
        account.number,
        account.points,
        account.created_at.strftime("%Y-%m-%d"),
        account.user.email
      ]
    end
  end
end
