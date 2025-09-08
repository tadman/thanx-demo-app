import React from "react";
import { Link } from "react-router-dom";

export default function RewardCardInline({ account }) {
  return <div className="reward-card h-36 w-96">
    <Link to={`/cards/${account.number}`}>
      <div className="flex flex-col space-y-2 rounded-md bg-orange-300 p-4 h-full">
        <div className="text-lg font-bold text-white">{account.number}</div>
        <div className="text-right mt-4 text-orange-800 font-bold text-xl">{account.points.toLocaleString()} Points</div>
      </div>
    </Link>
  </div>;
}
