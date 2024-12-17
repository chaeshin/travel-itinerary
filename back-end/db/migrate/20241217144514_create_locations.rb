class CreateLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.string :category
      t.integer :priority
      t.boolean :reservation_required
      t.boolean :reservation_completed
      t.datetime :opening_time
      t.datetime :closing_time
      t.integer :typical_time_spent
      t.references :trip_id, null: false, foreign_key: true
      t.references :user_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
