import { Account, AccountTransaction, Reward, User } from "./models";

function railsCSRFToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;

  if (!meta || !meta.content) {
    throw new Error("CSRF token not found, cannot proceed. Check that the csrf_meta_tags call is present in the Rails layout.");
  }

  return meta?.content!;
}

async function railsPost(url): Promise<Response> {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'X-CSRF-Token': railsCSRFToken(),
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  });
}

async function throwError(response: Response, defaultMessage: string) {
  throw new Error((await response.json())?.error?.message || defaultMessage);
}

// This encapsulates the more low-level REST API exposed by Rails and converts
// to internal TypeScript model representations.

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

  static async getRewards(): Promise<Reward[]> {
    const response = await fetch("/api/rewards");

    if (!response.ok) {
      await throwError(response, "Failed to fetch rewards");
    }

    return (await response.json()).map(reward => new Reward(reward));
  }

  static async redeemReward(id): Promise<{ account: Account, transaction: AccountTransaction }> {
    const response = await railsPost(`/api/rewards/${id}/redeem`);

    if (!response.ok) {
      await throwError(response, "Failed to redeem reward");
    }

    const data = await response.json();

    return {
      account: new Account(data.account),
      transaction: new AccountTransaction(data.transaction),
    }
  }

  static async getAccounts(): Promise<Account[]> {
    const response = await fetch("/api/accounts");

    if (!response.ok) {
      await throwError(response, "Failed to fetch accounts");
    }

    return (await response.json()).map(account => new Account(account));
  }

  static async getAccountDefault(): Promise<Account> {
    const response = await fetch("/api/accounts/default");

    if (!response.ok) {
      await throwError(response, "Failed to fetch default account");
    }

    return new Account(await response.json());
  }

  static async getAccount(id): Promise<Account> {
    const response = await fetch(`/api/accounts/${id}`);

    if (!response.ok) {
      await throwError(response, "Failed to fetch account");
    }

    return new Account(await response.json());
  }

  static async getAccountTransactions(id): Promise<AccountTransaction[]> {
    const response = await fetch(`/api/accounts/${id}/account_transactions`);

    if (!response.ok) {
      await throwError(response, "Failed to fetch account transactions");
    }

    return (await response.json()).map(transaction => new AccountTransaction(transaction));
  }
}
