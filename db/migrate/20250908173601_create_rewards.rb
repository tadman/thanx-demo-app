class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :url, null: false
      t.datetime :published_at, null: true
      t.integer :points, null: false
      t.timestamps
    end

    add_index :rewards, :published_at
  end
end
