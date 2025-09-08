import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { API } from "./api";

import { Reward } from "./models";
import Loading from "./Loading";

export default function RewardView() {
  const { id } = useParams();
  const [reward, setReward] = useState<Reward | null>(null);

  useEffect(() => {
    if (!id) return;
    API.getReward(id)
      .then((reward) => {
        setReward(reward);
      });
  }, [id]);

  if (!reward) {
    return <Loading />;
  }

  return <div>
    <Link to="/" className="btn">&lt; Back</Link>

    <h1 className="mt-2 text-2xl font-bold text-orange-400">{reward.title}</h1>
    <p className="text-gray-500">{reward.description}</p>

    <div className="relative inline-block rounded overflow-hidden">
      <img src={reward.url} alt={reward.title} style={{ maxWidth: "900px", maxHeight: "900px" }} />

      <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded bg-orange-500 text-orange-50">
        {reward.points.toLocaleString()} Points
      </span>
    </div>

    <div className="mt-4">
      <Link to={`/reward/${reward.id}`} className="btn btn-redeem">Redeem</Link>
    </div>
  </div>;
}
