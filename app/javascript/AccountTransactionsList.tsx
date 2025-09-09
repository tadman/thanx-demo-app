import React, { useEffect } from "react";

import { AccountTransaction } from "./models";

import { API } from "./api";

import { useAppState } from "./AppState";

export default function AccountTransactionsList({ transactions }: { transactions: AccountTransaction[] }) {
  const { rewardsById, setRewardsById } = useAppState();

  useEffect(() => {
    API.getRewards()
      .then((rewards) => {
        setRewardsById(rewards.reduce((byId, reward) => {
          byId[reward.id] = reward;

          return byId;
        }, {}));
      });
  }, []);

  return <div className="container">
    <table className="table-auto w-full border-separate border-spacing-0">
      <thead className="text-md bg-orange-200 text-gray-700 uppercase">
        <tr>
          <th>Date</th>
          <th colSpan={2}>Points</th>
          <th>Reward</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => <tr key={transaction.id}>
            <td className="px-4 py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-2">{transaction.points < 0 ? "Redeemed" : "Rewarded"}</td>
            <td className="text-right px-4 py-2">{transaction.points.toLocaleString()}</td>
            <td className="px-4 py-2">{rewardsById[transaction.rewardId]?.title}</td>
          </tr>
        )}

        {transactions.length === 0 && (<tr key="no-transactions">
          <td colSpan={3}><div className="text-center p-4">No transactions found</div></td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}
