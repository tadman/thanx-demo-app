class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise(
    :database_authenticatable,
    :lockable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable
  )

  has_many :accounts,
    dependent: :destroy

  def default_account
    accounts.first
  end

  def as_json(*_options)
    # Restricted view into user record
    {
      id:,
      email:,
      created_at:,
      updated_at:
    }
  end
end
