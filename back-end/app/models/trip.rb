class Trip < ApplicationRecord
  has_many :locations
  has_many :photos
  has_many :users, through: :users_trips

  validates :name, presence: true
  validates :end_time, comparison: { greater_than: :start_time }
end
