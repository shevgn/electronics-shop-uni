import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/page";
import AuthPage from "@/pages/auth/page";
import Product from "@/pages/product/page";
import Cart from "@/pages/cart/page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
