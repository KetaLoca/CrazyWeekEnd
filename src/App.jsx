import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Page404 } from "./pages/Page404";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { AccountPage } from "./pages/AccountPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
  );
}

export default App;
