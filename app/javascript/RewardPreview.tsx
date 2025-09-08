import React from "react";
import { Link } from "react-router-dom";

export default function RewardPreview({ reward }) {
  return <div className="reward-preview w-96 overflow-hidden rounded-md shadow-lg bg-white">
    <div className="p-4">
      <h3 className="text-orange-400">{reward.title}</h3>
      <p className="h-24 text-gray-500">{reward.description}</p>

      <Link to={`/reward/${reward.id}`}>
        <div className="relative inline-block rounded overflow-hidden group outline outline-none outline-offset-2 hover:outline-orange-400 hover:border-orange-500">
          <img src={reward.url} alt={reward.title} className="w-96 h-96" />

          <span className="absolute bottom-2.5 right-2.5 bg-white opacity-70 p-1.5 rounded group-hover:opacity-100 group-hover:bg-orange-500 group-hover:text-orange-50">
            {reward.points} Points
          </span>
        </div>
      </Link>
    </div>
  </div>;
}
