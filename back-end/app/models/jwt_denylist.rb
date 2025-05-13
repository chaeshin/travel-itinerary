class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = 'jwt_denylist'

  # This model is used to store the revoked JWT tokens in the database.
  # It includes the Devise::JWT::RevocationStrategies::Denylist module,
  # which provides the necessary methods for revoking and checking tokens.

  # The table name is set to 'jwt_denylist' to match the database table.
end
