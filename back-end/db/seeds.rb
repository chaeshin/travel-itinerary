# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.create!([{
  email: 'john@gmail.com'
},
{
  email: 'mary@gmail.com'
},
{
  email: 'rebecca@gmail.com'
}
])

Trip.create!([{
  name:,

}])
Location.create!([{
  name:'Tokyo National Museum',
  address: '13-9 Uenokoen, Taito City, Tokyo 110-8712',
  phone_number: '+81 05055418600',
  category: 'historic site',
  priority: 1,
  reservation_required: false,
  reservation_completed: false,
  typical_time_spent:,
  trip:,
  user:,

}
])
