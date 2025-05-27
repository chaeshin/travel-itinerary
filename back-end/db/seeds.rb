# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts " "
puts "Cleaning the DB..."
User.destroy_all
Trip.destroy_all
Location.destroy_all
TravelTime.destroy_all
Like.destroy_all
Photo.destroy_all

p("creating users")
john = User.create!({
  email: 'john@gmail.com',
  password: 'password'
})

mary = User.create!({
  email: 'mary@gmail.com',
  password: 'password'
})

rebecca = User.create!({
  email: 'rebecca@gmail.com',
  password: 'password'
})


p("creating trips")
tokyo = Trip.create!({
  name: 'Tokyo',
  start_time: DateTime.strptime("5/01/2025 8:00", "%m/%d/%Y %H:%M"),
  end_time: DateTime.strptime("05/15/2025 17:00", "%m/%d/%Y %H:%M")
})

south_of_france = Trip.create!({
  name: 'South of France',
  start_time: DateTime.strptime("6/01/2025 8:00", "%m/%d/%Y %H:%M"),
  end_time: DateTime.strptime("06/15/2025 17:00", "%m/%d/%Y %H:%M")
})

mexico_city = Trip.create!({
  name: 'Mexico City',
  start_time: DateTime.strptime("7/01/2025 8:00", "%m/%d/%Y %H:%M"),
  end_time: DateTime.strptime("07/15/2025 17:00", "%m/%d/%Y %H:%M")
})

p("creating locations")
tokyo_national_museum = Location.create!({
  name: 'Tokyo National Museum',
  address: '13-9 Uenokoen, Taito City, Tokyo 110-8712',
  phone_number: '+81 05055418600',
  category: 'national museum',
  priority: 1,
  reservation_required: false,
  reservation_completed: false,
  trip: tokyo,
  user: john,
  website: 'https://www.tnm.jp/',
  longitude: 139.773,
  latitude: 35.718
})

tokyo_tower = Location.create!({
  name: 'Tokyo Tower',
  address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011',
  phone_number: '+81 0334335111',
  category: 'observatioin deck',
  priority: 1,
  reservation_required: false,
  reservation_completed: false,
  trip: tokyo,
  user: mary,
  website: 'https://www.tokyotower.co.jp/',
  longitude: 139.745,
  latitude: 35.6586
})

nezu_museum = Location.create!({
  name: 'Nezu Museum',
  address: '6 Chome-5-1 Minamiaoyama, Minato City, Tokyo 107-0062',
  phone_number: '+81 0334762020',
  category: 'museum',
  priority: 2,
  reservation_required: true,
  reservation_completed: false,
  trip: tokyo,
  user: rebecca,
  website: 'https://www.nezu-muse.or.jp/en/',
  longitude: 139.720,
  latitude: 35.664
})

meiji_jingu = Location.create!({
  name: 'Meiji Jingu',
  address: '1 Chome-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557',
  phone_number: '+81 0334773600',
  category: 'shrine',
  priority: 2,
  reservation_required: false,
  reservation_completed: false,
  trip: tokyo,
  user: john,
  website: 'https://www.meijijingu.or.jp/en/',
  longitude: 139.699,
  latitude: 35.6764
})

p("creating travel times")
TravelTime.create!([{
  start_location: tokyo_national_museum,
  end_location: tokyo_tower,
  time_in_min: 30,
  transportation_type: 'public'
}])

p("likes")
Like.create!([{
  user: mary,
  location: tokyo_national_museum
}])

p("creating photos")
Photo.create([{
  trip: tokyo,
  url: nil
}])
