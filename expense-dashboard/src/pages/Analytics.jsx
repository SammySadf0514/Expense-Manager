import { useEffect, useState } from "react";
import { api } from "../api";

const Analytics = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.getTransactions(user._id).then(setTransactions);
  }, [user]);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const total = income + expense;

  const incomePercent = total ? (income / total) * 100 : 0;

  return (
    <>
      <h1>Analytics</h1>

      <div className="stats">
        <div className="card income">
          <p>Total Income</p>
          <h2>₹{income}</h2>
        </div>

        <div className="card expense">
          <p>Total Expenses</p>
          <h2>₹{expense}</h2>
        </div>

        <div className="card">
          <p>Savings</p>
          <h2>₹{income - expense}</h2>
        </div>
      </div>

      <div className="card breakdown">
        <h3>Breakdown</h3>

        <div className="bar">
          <div
            className="income-bar"
            style={{ width: `${incomePercent}%` }}
          ></div>
          <div
            className="expense-bar"
            style={{ width: `${100 - incomePercent}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Analytics;