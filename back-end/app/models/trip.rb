class Trip < ApplicationRecord
  has_many :locations, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :users_trips, dependent: :destroy
  has_many :users, through: :users_trips

  validates :name, presence: true
  validates :end_time, comparison: { greater_than: :start_time }
end
