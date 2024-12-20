class Location < ApplicationRecord
  belongs_to :trip
  belongs_to :user
  has_many :travel_times
  has_many :likes

  validates :name, presence: true, uniqueness: { scope: :trip }
  # validate address format
  validates :address, presence: true, uniqueness: { scope: :trip }
  # phone number format
  validates :category, inclusion: { in: ["restaurant", "store", "National museum", "historic site", 'Observatioin deck']}
  validates :priority, presence: true, numericality: { greater_than: 0 }

end
