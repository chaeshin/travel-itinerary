class TripsController < ApplicationController
  before_action :authenticate_user!  # Changed from authenticate_user to authenticate_user!
  before_action :set_trip, only: [:show, :destroy]

  def index
    @trips = Trip.all
    render json: @trips
  end

  def show
    render json: @trip, include: :locations
  end

  def create
    @trip = Trip.new(trip_params)  # Fixed: trip.params -> trip_params
    if @trip.save
      UsersTrip.create(user: current_user, trip: @trip)
      render json: @trip, status: :created
    else
      render json: { errors: @trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      if @trip.users_trips.where(user: current_user).exists?
        @trip.destroy!  # Using destroy! to raise an error if deletion fails
        render json: { message: "Trip successfully deleted" }, status: :ok
      else
        render json: { error: "Unauthorized to delete this trip" }, status: :forbidden
      end
    rescue ActiveRecord::RecordNotDestroyed => e
      render json: { error: "Failed to delete trip", details: e.record.errors.full_messages }, status: :unprocessable_entity
    rescue StandardError => e
      render json: { error: "Server error", details: e.message }, status: :internal_server_error
    end
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Trip not found' }, status: :not_found
  end

  def trip_params
    params.require(:trip).permit(:name, :start_time, :end_time)
  end
end
