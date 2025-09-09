import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAppState } from "./AppState";
import { API } from "./api";
import { Account, User } from "./models";

import RewardCardProfile from "./RewardCardProfile";
import RewardView from "./RewardView";
import UserProfile from "./UserProfile";

import Fault from "./Fault";

export default function App() {
  const { user, setUser } = useAppState();
  const { account, setAccount } = useAppState();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    API.getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    API.getAccountDefault()
      .then((account) => {
        setAccount(account);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <Fault error={error} />;
  }

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/cards/:number" element={<RewardCardProfile />} />
      <Route path="/reward/:id" element={<RewardView />} />
    </Routes>
  </BrowserRouter>;
}
