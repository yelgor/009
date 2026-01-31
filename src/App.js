import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import Equipment from "./pages/Equipment/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail/EquipmentDetail";

import Cart from "./pages/Cart/Cart";
import MyBorrows from "./pages/MyBorrows/MyBorrows";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/my-borrows" element={<MyBorrows />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
