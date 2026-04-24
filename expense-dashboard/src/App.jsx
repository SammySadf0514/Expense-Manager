import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

function App() {
  const [user, setUser] = useState(null);

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
            <li><NavLink to="/" end className="nav-link">Dashboard</NavLink></li>
            <li><NavLink to="/transactions" className="nav-link">Transactions</NavLink></li>
            <li><NavLink to="/analytics" className="nav-link">Analytics</NavLink></li>
            <li><NavLink to="/settings" className="nav-link">Settings</NavLink></li>
          </ul>
        </nav>

        <button className="btn" onClick={() => setUser(null)}>
          Logout
        </button>
      </aside>

      {/* Pages */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/transactions" element={<Transactions user={user} />} />
          <Route path="/analytics" element={<Analytics user={user} />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;