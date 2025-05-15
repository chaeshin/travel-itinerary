# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json
    skip_before_action :authenticate_user!, only: [:create]

    def create
      user = User.find_by(email: sign_in_params[:email])
      if user && user.valid_password?(sign_in_params[:password])
        token = generate_jwt_token(user)
        puts "DEBUG: Generated token: #{token}"  # Add debug output
        render json: {
          token: token,
          user: {
            id: user.id,
            email: user.email
          }
        }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    private

    def sign_in_params
      params.require(:user).permit(:email, :password)
    end

    def generate_jwt_token(user)
      JWT.encode(
        { user_id: user.id, exp: 24.hours.from_now.to_i },
        ENV['DEVISE_JWT_SECRET_KEY'],
        'HS256'
      )
    end
  end
end
