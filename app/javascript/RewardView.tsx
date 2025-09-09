import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { API } from "./api";
import { useAppState } from "./AppState";

import Loading from "./Loading";

import { Reward } from "./models";

import RewardCardInline from "./RewardCardInline";

enum RedeemState {
  Available,
  Claimed,
  Confirming,
  Submitted,
  Redeemed,
  InsufficientPoints,
  Rejected
};

function redeem(reward, setRedeemState, setAccount) {
  API.redeemReward(reward.id)
    .then(({ account }) => {
      setRedeemState(RedeemState.Claimed);

      setAccount(account);
    })
    .catch((error) => {
      // FUTURE: Provide a consistent code for matching errors instead of an arbitrary error description
      if (error.message === "Insufficient points") {
        setRedeemState(RedeemState.InsufficientPoints);
      } else {
        setRedeemState(RedeemState.Rejected);
      }
  });
}

function RedeemOptions({ reward,redeemState, setRedeemState, setAccount }) {
  if (redeemState === RedeemState.Available) {
    return <div className="btn btn-redeem" onClick={() => setRedeemState(RedeemState.Confirming)}>Redeem</div>;
  }

  if (redeemState === RedeemState.Claimed) {
    return <div className="bg-white rounded p-8 text-center justify-center">Reward has been redeemed.</div>;
  }

  if (redeemState === RedeemState.Confirming) {
    return <div className="bg-white rounded-md p-4">
      <p>Are you sure you want to redeem this reward for {reward.points.toLocaleString()} points?</p>

      <div className="flex gap-4">
        <div className="btn btn-redeem" onClick={() => redeem(reward, setRedeemState, setAccount)}>Confirm</div>
        <div className="btn btn-cancel" onClick={() => setRedeemState(RedeemState.Available)}>Cancel</div>
      </div>
    </div>;
  }

  if (redeemState === RedeemState.Submitted) {
    return <div className="btn btn-redeem">Confirming...</div>;
  }

  if (redeemState === RedeemState.Redeemed) {
    return <div className="bg-white rounded p-8 text-center justify-center">This reward has already been redeemed.</div>;
  }

  if (redeemState === RedeemState.InsufficientPoints) {
    return <div className="disclosure disclosure-error">Account does not have sufficient points to redeem this reward.</div>;
  }

  if (redeemState === RedeemState.Rejected) {
    return <div>Redeem operation failed</div>;
  }

  return <div>Not available to redeem at this time.</div>;
}

function RedeemBadge({ reward, redeemed }) {
  if (reward.redeemed || redeemed) {
    return <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded opacity-100 bg-orange-500 text-orange-50">
      Redeemed
    </span>;
  }

  return <span className="absolute bottom-2.5 right-2.5 bg-white opacity-70 p-1.5 rounded group-hover:opacity-100 group-hover:bg-orange-500 group-hover:text-orange-50">{reward.points} Points</span>;
}

export default function RewardView() {
  const { account, setAccount } = useAppState();
  const { id } = useParams();
  const [reward, setReward] = useState<Reward | null>(null);
  const [redeemState, setRedeemState] = useState<RedeemState>(RedeemState.Available);

  useEffect(() => {
    if (!id) return;

    API.getReward(id)
      .then((reward) => {
        if (account && account.points < reward.points) {
          setRedeemState(RedeemState.InsufficientPoints);
        } else {
          setRedeemState(RedeemState.Available);
        }

        if (reward.redeemed) {
          setRedeemState(RedeemState.Redeemed);
        }

        setReward(reward);
      });
  }, [id, account]);

  if (!reward) {
    return <Loading />;
  }

  return <div className="w-[740px] flex flex-col space-y-4">
    <Link to="/" className="btn">&lt; Back</Link>

    <RewardCardInline />

    <h1 className="mt-2 text-2xl font-bold text-orange-400">{reward.title}</h1>
    <p className="text-gray-500">{reward.description}</p>

    <div className="relative inline-block rounded overflow-hidden">
      <img src={reward.url} alt={reward.title} style={{ maxWidth: "900px", maxHeight: "900px" }} />

      <RedeemBadge reward={reward} redeemed={redeemState === RedeemState.Redeemed} />
    </div>

    <div className="mt-4">
      <RedeemOptions reward={reward} redeemState={redeemState} setRedeemState={setRedeemState} setAccount={setAccount} />
    </div>
  </div>;
}
