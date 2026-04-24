const BASE_URL = "http://localhost:5000/api";

export const api = {
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getTransactions: async (userId) => {
    const res = await fetch(`${BASE_URL}/transactions/${userId}`);
    return res.json();
  },

  addTransaction: async (data) => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteTransaction: async (id) => {
    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
  },

  // 🔥 FIXED
  updateUser: async (id, data) => {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
