const BASE_URL = "http://localhost:5000/api";

// ✅ Safe JSON parser (fixes your error)
const handleJSON = async (res) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Invalid JSON response:", text);
    throw new Error("Server did not return valid JSON");
  }
};

export const api = {
  // 🔐 Register
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleJSON(res);
  },

  // 🔐 Login
  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleJSON(res);
  },

  // 📥 Get Transactions
  getTransactions: async (userId) => {
    const res = await fetch(`${BASE_URL}/transactions/${userId}`);
    return handleJSON(res);
  },

  // ➕ Add Transaction
  addTransaction: async (data) => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleJSON(res);
  },

  // ❌ Delete Transaction
  deleteTransaction: async (id) => {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });

    return handleJSON(res);
  },
};
