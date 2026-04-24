import { useState, useEffect } from "react";
import { TransactionContext } from "./TransactionContext";

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Salary",
            amount: 50000,
            type: "income",
            date: "Aug 1",
          },
        ];
  });

  // 💾 Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};