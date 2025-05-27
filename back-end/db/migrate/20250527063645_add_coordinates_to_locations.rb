class AddCoordinatesToLocations < ActiveRecord::Migration[7.1]
  def change
    add_column :locations, :latitude, :decimal
    add_column :locations, :longitude, :decimal
  end
end
