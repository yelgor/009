import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import MyBorrows from "./pages/MyBorrows/MyBorrows";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-borrows" element={<MyBorrows />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
