# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Where your request come from, eg: your react app's IP address or URL.
    origins 'http://127.0.0.1:5173'
    # origins '*' # this allows everything but risky
    # origins 'https:// domain of the deployed project' # when deployed you can do this line

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end