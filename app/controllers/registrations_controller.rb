class RegistrationsController < Devise::RegistrationsController
  def create_guest
    @user = User.generate_guest_credentials
  end
end