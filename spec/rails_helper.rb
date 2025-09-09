# frozen_string_literal: true

# Force into the test environment
ENV["RAILS_ENV"] = "test"

require_relative "../config/environment"

require "devise"

require "rspec/rails"

require_relative "support/factory_bot"
require_relative "spec_helper"

# Prevent database truncation if the environment is production
if Rails.env.production?
  abort("The Rails environment is running in production mode!")
end

RSpec.configure do |config|
  # Supports mocking a user for running test queries
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Devise::Test::IntegrationHelpers, type: :request

  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end

FactoryBot::SyntaxRunner.class_eval do
  include ActionDispatch::TestProcess
end
