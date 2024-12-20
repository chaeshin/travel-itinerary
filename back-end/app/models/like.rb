class Like < ApplicationRecord
  belongs_to :user
  belongs_to :location

  # validate user and location combination is unique
  validates :user, uniqueness: { scope: :location }
end
