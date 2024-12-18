class TravelTime < ApplicationRecord
  belongs_to :start_location_id
  belongs_to :end_location_id
end
