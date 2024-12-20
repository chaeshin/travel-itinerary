class TravelTime < ApplicationRecord
  belongs_to :start_location, class_name: 'Location', foreign_key: 'start_location_id', required: true
  belongs_to :end_location, class_name: 'Location', foreign_key: 'end_location_id', required: true

  validates :start_location, uniqueness: { scope: :end_location }
  validates :time_in_min, numericality: { greater_than: 0 }
  validates :transportation_type, inclusion: { in: ['walking', 'public', 'bike', 'taxi'] }
end
