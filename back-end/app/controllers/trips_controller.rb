class TripsController < ApplicationController
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

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip.params)
    if @trip.save
    end
  end

end
