class CreateTravelTimes < ActiveRecord::Migration[7.1]
  def change
    create_table :travel_times do |t|
      t.references :start_location, null: false, foreign_key: { to_table: :locations }
      t.references :end_location, null: false, foreign_key: { to_table: :locations }
      t.integer :time_in_min
      t.string :transportation_type

      t.timestamps
    end
  end
end
