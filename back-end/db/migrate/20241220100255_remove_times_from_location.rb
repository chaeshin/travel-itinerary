class RemoveTimesFromLocation < ActiveRecord::Migration[7.1]
  def change
    remove_column :locations, :opening_time, :datetime
    remove_column :locations, :closing_time, :datetime
    remove_column :locations, :typical_time_spent, :integer
  end
end
