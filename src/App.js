import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Equipment from "./pages/Equipment/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail/EquipmentDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
