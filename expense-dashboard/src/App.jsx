import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "./api";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTO LOGIN
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.getMe();

        if (userData._id) {
          setUser(userData);
        } else {
          localStorage.removeItem("token");
        }

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // 🔐 Auth check
  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Expensify</h2>

        <nav>
          <ul>
            <li>
              <NavLink to="/" end className="nav-link">
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/transactions" className="nav-link">
                Transactions
              </NavLink>
            </li>

            <li>
              <NavLink to="/analytics" className="nav-link">
                Analytics
              </NavLink>
            </li>

            <li>
              <NavLink to="/settings" className="nav-link">
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* 🚪 Logout */}
        <button
          className="btn"
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
          }}
        >
          Logout
        </button>
      </aside>

      {/* Pages */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/settings"
            element={
              <Settings
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;