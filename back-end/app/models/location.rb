class Location < ApplicationRecord
  belongs_to :trip_id
  belongs_to :user_id
end
