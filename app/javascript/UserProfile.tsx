import React from "react";

import { useAppState } from "./AppState";

import RewardCardInline from "./RewardCardInline";
import RewardList from "./RewardList";

import Loading from "./Loading";

export default function UserProfile() {
  const { user } = useAppState();

  if (!user) {
    return <Loading />;
  }

  return <div className="flex flex-col space-y-4">
    <h1 className="text-2xl font-bold">Reward Catalog</h1>

    <div className="container">
      <p>{user.email}</p>
    </div>

    <RewardCardInline />

    <RewardList />
  </div>;
}
