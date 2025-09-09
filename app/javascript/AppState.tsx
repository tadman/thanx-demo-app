import React, { createContext, useContext, useState } from "react";

import { API } from "./api";
import { Account, Reward, User } from "./models";

type AppState = {
  user: User | null;
  setUser: (user: User | null) => void;
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  rewardsById: Record<string, Reward>;
  setRewardsById: (rewards: Record<string, Reward>) => void;
};

export default AppState;

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [rewardsById, setRewardsById] = useState<Record<string, Reward>>({});

  return (
    <AppStateContext.Provider value={{ user, accounts, rewardsById, setUser, setAccounts, setRewardsById }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);

  if (!ctx) {
    throw new Error("useAppState() requires components to be wrapped in an AppStateProvider");
  }

  return ctx;
}

export function getUser() {
  const { user, setUser } = useAppState();

  if (!user) {
    API.getUser()
      .then((user) => {
        setUser(user);
      });
  }

  return user;
}

export function getAccounts() {
  const { accounts, setAccounts } = useAppState();

  if (!accounts) {
    API.getAccounts()
      .then((accounts) => {
        setAccounts(accounts);
      });
  }

  return accounts;
}

export function getRewards() {
  const { rewardsById, setRewardsById } = useAppState();

  if (!rewardsById) {
    API.getRewards()
      .then((rewards) => {
        setRewardsById(rewards.reduce((byId, reward) => {
          byId[reward.id] = reward;

          return byId;
        }, {}));
      });
  }

  return rewardsById;
}
