import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { API } from "./api";
import { Account, User } from "./models";

import RewardCardProfile from "./RewardCardProfile";
import RewardView from "./RewardView";
import UserProfile from "./UserProfile";

import Fault from "./Fault";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    API.getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setUser(null);
        setError(error);
      });
  }, []);

  useEffect(() => {
    API.getAccounts()
      .then((accounts) => {
        setAccounts(accounts);
      })
      .catch((error) => {
        setUser(null);
        setError(error);
      });
  }, []);

  if (error) {
    return <Fault error={error} />;
  }

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserProfile user={user} accounts={accounts} />} />
      <Route path="/cards/:number" element={<RewardCardProfile />} />
      <Route path="/reward/:id" element={<RewardView />} />
    </Routes>
  </BrowserRouter>;
}
