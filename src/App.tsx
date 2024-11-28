import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage/AuthPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
