import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import s from "./Cart.module.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createBorrow } from "../../api/http.js";
import CartItems from "./components/CartItems.jsx";
import CartForm from "./components/CartForm.jsx";

export default function Cart() {
  const location = useLocation();
  const { cart, removeFromCart, clearCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ returnDate: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const todayISO = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setSubmitError("Щоб оформити позику, увійдіть у зареєстрований акаунт.");
      return;
    }

    if (cart.length === 0) {
      setSubmitError("Кошик порожній");
      return;
    }

    if (!formData.returnDate || formData.returnDate < todayISO) {
      setSubmitError("Оберіть дату повернення не раніше сьогоднішньої.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await createBorrow({
        email: currentUser.email,
        returnDate: formData.returnDate,
        comment: formData.comment,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
        })),
        borrowDate: new Date().toLocaleDateString("uk-UA"),
        status: "active",
      });

      clearCart();
      setSubmitSuccess(true);
      setFormData({ returnDate: "", comment: "" });
    } catch {
      setSubmitError("Помилка при оформленні. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />
        <div className={s.body}>
          <main className={s.main}>
            <div className={s.container}>
              <section className={s.cartSection}>
                <div className={s.cartHeader}>
                  <h1 className={s.cartTitle}>Ваш кошик</h1>
                  <span className={s.itemCount}>({cart.length})</span>
                </div>

                {submitSuccess && <p className={s.successMessage}>✓ Позику успішно оформлено!</p>}
                <CartItems items={cart} onRemove={removeFromCart} submitSuccess={submitSuccess} />
              </section>

              <CartForm
                currentUser={currentUser}
                isAuthenticated={isAuthenticated}
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                todayISO={todayISO}
                submitting={submitting}
                submitError={submitError}
                itemCount={cart.length}
                locationPath={location.pathname}
              />
            </div>
          </main>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
