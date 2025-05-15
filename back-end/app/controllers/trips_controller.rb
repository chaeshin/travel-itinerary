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

  def test
    if current_user
      # Render HTML instead of JSON for visual inspection
      render html: "
        <h1>Trips for #{current_user.email}</h1>
        <pre>#{JSON.pretty_generate(Trip.all.as_json)}</pre>
        <style>
          pre {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            white-space: pre-wrap;
          }
        </style>
      ".html_safe
    else
      render html: "<h1>Not authenticated</h1>".html_safe
    end
  end

end
