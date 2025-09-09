import React, { createContext, useContext, useState } from "react";

import { API } from "./api";
import { Account, Reward, User } from "./models";

type AppState = {
  user: User | null;
  setUser: (user: User | null) => void;
  account: Account | null;
  setAccount: (account: Account | null) => void;
  rewardsById: Record<string, Reward>;
  setRewardsById: (rewards: Record<string, Reward>) => void;
};

export default AppState;

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [rewardsById, setRewardsById] = useState<Record<string, Reward>>({});

  return (
    <AppStateContext.Provider value={{ user, account, rewardsById, setUser, setAccount, setRewardsById }}>
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

// export function getUser() {
//   const { user, setUser } = useAppState();

//   if (!user) {
//     API.getUser()
//       .then((user) => {
//         setUser(user);
//       });
//   }

//   return user;
// }

// export function getAccount() {
//   const { account, setAccount } = useAppState();

//   if (!account) {
//     API.getAccountDefault()
//       .then((account) => {
//         setAccount(account);
//       });
//   }

//   return account;
// }

// export function getRewards() {

//   return rewardsById;
// }
