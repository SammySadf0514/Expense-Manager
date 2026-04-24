import { useEffect, useState } from "react";
import { api } from "../api";

const Dashboard = ({ user }) => {
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

  const balance = income - expense;

  return (
    <>
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="card">
          <p>Balance</p>
          <h2>₹{balance}</h2>
        </div>

        <div className="card income">
          <p>Income</p>
          <h2>₹{income}</h2>
        </div>

        <div className="card expense">
          <p>Expenses</p>
          <h2>₹{expense}</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;