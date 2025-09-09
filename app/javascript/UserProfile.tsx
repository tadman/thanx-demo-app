import React, { useState, useEffect } from "react";

import { useAppState } from "./AppState";

import RewardCardInline from "./RewardCardInline";
import RewardList from "./RewardList";

import { API } from "./api";
import { Reward } from "./models";
import Loading from "./Loading";

export default function UserProfile() {
  const { user } = useAppState();
  const { account } = useAppState();
  const [rewards, setRewards] = useState<Reward[number]>([]);

  useEffect(() => {
    API.getRewards()
      .then((rewards) => {
        setRewards(rewards);
      });
  }, []);

  if (!user) {
    return <Loading />;
  }

  return <div className="flex flex-col space-y-4">
    <h1 className="text-2xl font-bold">Reward Catalog</h1>

    <div className="container">
      <p>{user.email}</p>
    </div>

    <RewardCardInline account={account} />

    <div>
      <RewardList rewards={rewards} points={account.points} />
    </div>
  </div>;
}
