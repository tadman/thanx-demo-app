class Account {
  id: string;
  number: string;
  points: number;
  default: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(data: Record<string, string | number | boolean | undefined>) {
    this.id = data.id as string;
    this.number = data.number as string;
    this.points = data.points as number;
    this.default = data.default as boolean;
    this.createdAt = data.createdAt as string;
    this.updatedAt = data.updatedAt as string;
  }
}

class AccountTransaction {
  id: string;
  accountId: string;
  rewardId: string;
  points: number;
  reward: Reward | null;
  createdAt: string;

  constructor(data: Record<string, string | number | null | undefined | Record<string, string | number | undefined>>) {
    this.id = data.id as string;
    this.accountId = data.accountId as string;
    this.rewardId = data.rewardId as string;
    this.points = data.points as number;
    this.reward = data.reward ? new Reward(data.reward as Record<string, string | number | undefined>) : null;
    this.createdAt = data.createdAt as string;
  }
}

class User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: Record<string, string | number | undefined>) {
    this.id = data.id as string;
    this.email = data.email as string;
    this.createdAt = data.createdAt as string;
    this.updatedAt = data.updatedAt as string;
  }
}

class Reward {
  id: string;
  title: string;
  description: string;
  url: string;
  points: number;
  redeemed: boolean;

  constructor(data: Record<string, string | number | boolean | undefined>) {
    this.id = data.id as string;
    this.title = data.title as string;
    this.description = data.description as string;
    this.url = data.url as string;
    this.points = data.points as number;
    this.redeemed = data.redeemed as boolean;
  }
}

export { Account, AccountTransaction, User, Reward };
