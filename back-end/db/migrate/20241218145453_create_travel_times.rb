class CreateTravelTimes < ActiveRecord::Migration[7.1]
  def change
    create_table :travel_times do |t|
      t.references :start_location_id, null: false, foreign_key: true
      t.references :end_location_id, null: false, foreign_key: true
      t.integer :time_in_min
      t.string :transportation_type

      t.timestamps
    end
  end
end
