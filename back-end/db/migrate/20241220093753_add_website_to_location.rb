class AddWebsiteToLocation < ActiveRecord::Migration[7.1]
  def change
    add_column :locations, :website, :string
  end
end
