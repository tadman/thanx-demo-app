import React from "react";

import RewardPreview from "./RewardPreview";

export default function RewardList({ rewards }) {
  return <div className="flex flex-wrap gap-4">
    {rewards.map((reward) => <RewardPreview key={reward.id} reward={reward} />)}
  </div>;
}
