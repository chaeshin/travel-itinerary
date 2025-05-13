class User < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_many :locations
  has_many :trips, through: :users_trips
  validates :email, format: { with: /\A.*@.*\.com\z/ }, presence: true, uniqueness: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
end
