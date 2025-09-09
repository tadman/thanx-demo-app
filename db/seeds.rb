# frozen_string_literal: true

# These seeds should be idempotent so running db:seed multiple times does not
# unnecessarily introduce extra records.

user = User.find_or_create_by!(
  email: "test@example.com"
) do |user|
  user.password = "example"
end

Account.find_or_create_by!(
  user:,
  number: "2025-123456"
) do |account|
  account.add_points(10_000)
end

user = User.find_or_create_by!(
  email: "test@example.net"
) do |user|
  user.password = "example"
end

Account.find_or_create_by!(
  user:,
  number: "2025-654321"
) do |account|
  account.add_points(10_000)
end

Account.find_or_create_by!(
  user:,
  number: "2025-543210"
) do |account|
  account.add_points(25_000)
end

[
  {
    title: "Diagnonal Toaster",
    description: "This toaster will make your bread toastier. Two generously wide slots and a unique diagnonal loading system.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/1cfdcd5c-4b12-46cf-9092-bceac4bb3a3d.png",
    points: 250
  },
  {
    title: "Frenetic Juicer",
    description: "Juice using advanced hydrocarbon-based thermoplastic. Near silent operation.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ab985938-aa42-43d3-81d8-74fdef7110ee.png",
    points: 500
  },
  {
    title: "Blitz Blender Turbo",
    description: "Blends so quickiy it might even violate some of the rules of physics.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+04_43_38+PM.png",
    points: 250
  },
  {
    title: "Countertop Dishwasher",
    description: "Will wash all your dishes quietly and with style, so long as it's near a sink.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+03_59_16+PM.png",
    points: 800
  },
  {
    title: "Tropical Tumblers",
    description: "Where else to store your juice than in these tropical-grade thermal tumblers.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+04_02_25+PM.png",
    points: 200
  },
  {
    title: "Mini Pizza Oven",
    description: "You have a tiny pizza. We have a tiny pizza oven. Together they make great food happen.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+04_43_29+PM.png",
    points: 1500
  },
  {
    title: "Squarenini Sandwich Press",
    description: "Gives your sandwiches the Italian-style grid look. Not to be confused with a gridiron.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+04_04_19+PM.png",
    points: 200
  },
  {
    title: "Waffle Maker",
    description: "You can't go wrong with a waffle maker. It's a classic. Diamond waffle version is sadly no longer available.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/dd9c392e-1227-4741-a43e-62160e9ce195.png",
    points: 350
  },
  {
    title: "Shredotronic",
    description: "Slice. Dice. Make julienne fries! You can also use this to extrude your own sausages, or vegeterian patties.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+10_44_35+PM.png",
    points: 1_800
  },
  {
    title: "Interdimensional Portal",
    description: "While small, this is technically a portal to another dimension and is convenient for discarding kitchen waste.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+10_42_24+PM.png",
    points: 8_000
  },
  {
    title: "Stunning Osmium Cube",
    description: "A cube of osmium, the ultimate flex. Can it be used as a kitchen appliance? It's the most dense element on the periodic table, so surely it has some utility.",
    url: "https://thanx-demo-app.s3.us-east-2.amazonaws.com/ChatGPT+Image+Sep+8%2C+2025+at+10_37_48+PM.png",
    points: 20_000
  }

].each do |reward|
  Reward.find_or_create_by!(title: reward[:title]) do |record|
    record.attributes = reward

    unless reward[:published] === false
      record.published_at = Time.now
    end
  end
end
