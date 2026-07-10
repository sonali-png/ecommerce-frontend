import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isAdminRoute = window.location.pathname.startsWith("/admin");

root.render(
  <React.StrictMode>
    {isAdminRoute ? (
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    ) : (
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    )}
  </React.StrictMode>
);