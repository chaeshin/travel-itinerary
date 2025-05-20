class LocationsController < ApplicationController
  before_action :set_trip

  def index
    @trip = Trip.find(params[:trip_id])
    @locations = @trip.locations
    render json: @locations
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Trip not found' }, status: :not_found
  end

  def show
    @location = Location.find(param[:id])
  end

  private

  def set_trip
    @trip = Trip.find(params[:trip_id])
  end
end
