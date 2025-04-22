class Location < ApplicationRecord
  belongs_to :trip
  belongs_to :user
  has_many :travel_times
  has_many :likes, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :trip }
  # validate address format
  validates :address, presence: true, uniqueness: { scope: :trip }
  # phone number format
  validates :category, inclusion: { in: ["restaurant", "store", "national museum", "historic site", 'observatioin deck', "museum", "shrine", "park", "temple", "art gallery", "zoo", "aquarium", "amusement park", "theater", "stadium", "shopping mall", "market"] }
  validates :priority, presence: true, numericality: { greater_than: 0 }

end
