source "https://rubygems.org"

gem "rails", "~> 8.0.2", ">= 8.0.2.1"

gem "dotenv-rails"
gem "propshaft"

gem "sqlite3"

gem "devise"

gem "puma", ">= 5.0"
gem "jsbundling-rails"
gem "stimulus-rails"
gem "cssbundling-rails"
gem "jbuilder"

gem "bcrypt", "~> 3.1.7"

gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false

gem "thruster", require: false

group :development, :test do
  gem "factory_bot_rails"
  gem "faker"

  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "rspec-rails"
  gem "selenium-webdriver"
end
