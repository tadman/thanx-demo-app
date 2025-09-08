FactoryBot.define do
  factory :reward do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    points { SecureRandom.random_number(10..100) * 100 }
    url { "http://example.com/image.png" }
  end
end
