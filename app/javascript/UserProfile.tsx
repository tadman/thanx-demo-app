import React, { useState, useEffect } from "react";

import RewardCardInline from "./RewardCardInline";
import RewardList from "./RewardList";

import { API } from "./api";
import { Reward } from "./models";
import Loading from "./Loading";

export default function UserProfile({ user, accounts }) {
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
    <h1>User Profile</h1>

    <div className="container">
      <p>Email: {user.email}</p>
    </div>

    <div className="flex flex-wrap gap-4">
      {accounts.map((account) => (
        <RewardCardInline key={account.id} account={account} />
      ))}
    </div>

    <div>
      <RewardList rewards={rewards} />
    </div>
  </div>;
}
