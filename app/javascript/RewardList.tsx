import React from "react";

import { useAppState } from "./AppState";

import RewardPreview from "./RewardPreview";

export default function RewardList() {
  const { account, rewardsById } = useAppState();

  return <div className="flex flex-wrap gap-4">
    {Object.values(rewardsById).sort((a, b) => b.points - a.points).map((reward) => <RewardPreview key={reward.id} reward={reward} points={account?.points} />)}
  </div>;
}
