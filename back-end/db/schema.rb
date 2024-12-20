# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_12_20_100255) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "location_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_likes_on_location_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "phone_number"
    t.string "category"
    t.integer "priority"
    t.boolean "reservation_required"
    t.boolean "reservation_completed"
    t.bigint "trip_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "website"
    t.index ["trip_id"], name: "index_locations_on_trip_id"
    t.index ["user_id"], name: "index_locations_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_photos_on_trip_id"
  end

  create_table "travel_times", force: :cascade do |t|
    t.bigint "start_location_id", null: false
    t.bigint "end_location_id", null: false
    t.integer "time_in_min"
    t.string "transportation_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_location_id"], name: "index_travel_times_on_end_location_id"
    t.index ["start_location_id"], name: "index_travel_times_on_start_location_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "name"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_trips", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_users_trips_on_trip_id"
    t.index ["user_id"], name: "index_users_trips_on_user_id"
  end

  add_foreign_key "likes", "locations"
  add_foreign_key "likes", "users"
  add_foreign_key "locations", "trips"
  add_foreign_key "locations", "users"
  add_foreign_key "photos", "trips"
  add_foreign_key "travel_times", "locations", column: "end_location_id"
  add_foreign_key "travel_times", "locations", column: "start_location_id"
  add_foreign_key "users_trips", "trips"
  add_foreign_key "users_trips", "users"
end
