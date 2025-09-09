import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAppState } from "./AppState";
import { API } from "./api";

import RewardCardProfile from "./RewardCardProfile";
import RewardView from "./RewardView";
import UserProfile from "./UserProfile";

export default function App() {
  const { setUser } = useAppState();

  useEffect(() => {
    API.getUser()
      .then((user) => {
        setUser(user);
      });
  }, [setUser]);

  const { setAccount } = useAppState();

  useEffect(() => {
    API.getAccountDefault()
      .then((account) => {
        setAccount(account);
      });
  }, [setAccount]);

  const { setRewardsById } = useAppState();

  useEffect(() => {
    API.getRewards()
      .then((rewards) => {
        setRewardsById(rewards.reduce((byId, reward) => {
          byId[reward.id] = reward;

          return byId;
        }, {}));
      });
  }, [setRewardsById]);

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/cards/:number" element={<RewardCardProfile />} />
      <Route path="/reward/:id" element={<RewardView />} />
    </Routes>
  </BrowserRouter>;
}
