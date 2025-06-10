class TripsController < ApplicationController
  before_action :authenticate_user

  def index
    @trips = Trip.all
    render json: @trips
  end

  def show
    @trip = Trip.find(params[:id])
    render json: @trip, include: :locations
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Trip not found' }, status: :not_found
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

  private

  def trip_params
    params.require(:trip).permit(:name, :start_time, :end_time)
  end
end
