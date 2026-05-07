import { useEffect, useState } from "react";
import { api } from "../api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
  });

  // 🔁 Fetch transactions (clean way)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // ➕ Add transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.addTransaction({
  ...formData,
  amount: Number(formData.amount),
  date: new Date().toLocaleDateString(),
});

      // 🔁 Refetch
      const updated = await api.getTransactions();
      setTransactions(updated);

      // Reset
      setFormData({
        title: "",
        amount: "",
        type: "expense",
      });

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  // ❌ Delete transaction
  const handleDelete = async (id) => {
    try {
      await api.deleteTransaction(id);

      // 🔁 Refetch
      const updated = await api.getTransactions();
      setTransactions(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Transactions</h1>
          <p className="subtitle">Track your income and expenses</p>
        </div>

        <button
          className="btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Transaction"}
        </button>
      </div>

      {/* ➕ FORM */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Salary, Groceries..."
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="Amount"
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <button type="submit" className="btn">
              Add
            </button>
          </form>
        </div>
      )}

      {/* 📋 LIST */}
      <div className="card">
        {transactions.length === 0 ? (
          <p className="muted">No transactions yet</p>
        ) : (
          <div className="transaction-list">
            {transactions.map((t) => (
              <div
                key={t._id}
                className={`transaction ${t.type}`}
              >
                <div className="left">
                  <h4>{t.title}</h4>
                  <span>{t.date}</span>
                </div>

                <div className="right">
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(t._id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;