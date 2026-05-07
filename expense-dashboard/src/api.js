const BASE_URL = "http://localhost:5000/api";

// 🔐 Get JWT token
const getToken = () => {
  return localStorage.getItem("token");
};

export const api = {
  // REGISTER
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  // LOGIN
  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
  // GET CURRENT USER
  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: getToken(),
      },
    });

    return res.json();
  },

  // GET TRANSACTIONS
  getTransactions: async () => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: getToken(),
      },
    });

    return res.json();
  },

  // ADD TRANSACTION
  addTransaction: async (data) => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  // DELETE TRANSACTION
  deleteTransaction: async (id) => {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: getToken(),
      },
    });

    return res.json();
  },

  // UPDATE USER
  updateUser: async (id, data) => {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};
