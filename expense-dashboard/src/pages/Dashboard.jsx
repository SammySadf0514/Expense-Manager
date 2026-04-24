import { useEffect, useState } from "react";
import { api } from "../api";

const Dashboard = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    api.getTransactions(user._id).then(setTransactions);
  }, [user]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const balance = income - expense;

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Welcome back, {user?.name || "User"} 👋
          </p>
        </div>

        <div className="avatar small">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="card profile">
        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{user?.name}</h2>
          <p className="muted">Expense Manager User</p>
        </div>
      </div>

      {/* STATS */}
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