class CreateAccountTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :account_transactions do |t|
      t.references :account, null: false, foreign_key: true
      t.references :reward, null: true, foreign_key: true
      t.integer :points, null: false
      t.timestamps
    end
  end
end
