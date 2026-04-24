import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { TransactionProvider } from "./context/TransactionProvider";
import { UserProvider } from "./context/UserProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </UserProvider>
  </React.StrictMode>
);