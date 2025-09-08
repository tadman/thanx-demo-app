import { User, Account, Reward } from "./models";

async function throwError(response: Response, defaultMessage: string) {
  throw new Error((await response.json())?.error?.message || defaultMessage);
}

export class API {
  static async getUser(): Promise<User> {
    const response = await fetch("/api/user");

    if (!response.ok) {
      await throwError(response, "Unauthorized");
    }

    return new User(await response.json());
  }

  static async getReward(id): Promise<Reward> {
    const response = await fetch(`/api/rewards/${id}`);

    if (!response.ok) {
      await throwError(response, "Failed to fetch reward");
    }

    return new Reward(await response.json());
  }

  static async getAccounts(): Promise<Account[]> {
    const response = await fetch("/api/accounts");

    if (!response.ok) {
      await throwError(response, "Failed to fetch accounts");
    }

    return (await response.json()).map((account) => new Account(account));
  }

  static async getAccount(id): Promise<Account> {
    const response = await fetch(`/api/accounts/${id}`);

    if (!response.ok) {
      await throwError(response, "Failed to fetch account");
    }

    return new Account(await response.json());
  }

  static async getRewards(): Promise<Reward[]> {
    const response = await fetch("/api/rewards");

    if (!response.ok) {
      await throwError(response, "Failed to fetch rewards");
    }

    return (await response.json()).map((reward) => new Reward(reward));
  }
}
