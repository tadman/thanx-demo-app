import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API } from "./api";
import { Account, AccountTransaction } from "./models";
import { useParams } from "react-router-dom";

import Loading from "./Loading";

import AccountTransactionsList from "./AccountTransactionsList";
import RewardCardInline from "./RewardCardInline";

export default function RewardCardProfile() {
  const { number } = useParams();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);

  useEffect(() => {
    API.getAccount(number)
      .then((account) => {
        setAccount(account);
      });
  }, [number]);

  useEffect(() => {
    if (!account) return;

    API.getAccountTransactions(account.id)
      .then((transactions) => {
        setTransactions(transactions);
      });
  }, [account]);

  if (!account) {
    return <Loading />;
  }

  return <div className="flex flex-col space-y-4">
    <Link to="/" className="btn">&lt; Back</Link>

    <RewardCardInline />

    <div>
      <h2>Reward History</h2>

      <AccountTransactionsList transactions={transactions} />
    </div>
  </div>;
}
