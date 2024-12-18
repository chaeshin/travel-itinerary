class CreateUsersTrips < ActiveRecord::Migration[7.1]
  def change
    create_table :users_trips do |t|
      t.references :trip_id, null: false, foreign_key: true
      t.references :user_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
