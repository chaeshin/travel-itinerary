class Location < ApplicationRecord
  belongs_to :trip
  belongs_to :user
  has_many :travel_times
  has_many :likes

  validates :name, presence: true, uniqueness: { scope: :trip }
  # validate address format
  validates :address, presence: true, uniqueness: { scope: :trip }
  validates :phone_number, format: { with: ^\\+?[1-9][0-9]{7,14}$ }
  validates :category, inclusion: { in: ["restaurant", "store", "museum", "historic site"]}
  validates :priority, presence: true, numericality: { greater_than: 0 }

end
