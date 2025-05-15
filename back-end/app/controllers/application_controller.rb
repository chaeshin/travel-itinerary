class ApplicationController < ActionController::API
  include ActionController::Cookies

  respond_to :json
  before_action :authenticate_user!

  private

  def authenticate_user!
    header = request.headers['Authorization']
    puts "DEBUG: Auth header: #{header}"  # Added debug
    return render json: { error: 'No token provided' }, status: :unauthorized unless header

    token = header.split(' ').last
    puts "DEBUG: Token: #{token}"  # Added debug
    puts "DEBUG: Secret key: #{ENV['DEVISE_JWT_SECRET_KEY']&.first(10)}..."  # Added debug

    begin
      decoded = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'], true, { algorithm: 'HS256' })[0]
      puts "DEBUG: Decoded token: #{decoded}"  # Added debug
      @current_user = User.find(decoded['user_id'])
    rescue JWT::DecodeError => e
      puts "DEBUG: JWT Error: #{e.message}"  # Added debug
      render json: { error: 'Invalid token' }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      puts "DEBUG: User not found: #{e.message}"  # Added debug
      render json: { error: 'User not found' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
