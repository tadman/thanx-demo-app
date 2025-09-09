import React from "react";

import { AccountTransaction } from "./models";

export default function AccountTransactionsList({ transactions }: { transactions: AccountTransaction[] }) {
  return <div className="container">
    <table className="table-auto w-full">
      <thead className="text-md bg-orange-200 text-gray-700 uppercase">
        <tr>
          <th>Date</th>
          <th>Points</th>
          <th>Reward</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => <tr key={transaction.id}>
            <td>{transaction.createdAt}</td>
            <td>{transaction.points}</td>
            <td>{transaction.reward?.title}</td>
          </tr>
        )}

        {transactions.length === 0 && (<tr key="no-transactions">
          <td colSpan={3}><div className="text-center p-4">No transactions found</div></td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}
