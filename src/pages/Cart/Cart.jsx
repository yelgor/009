import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./Cart.module.css";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createBorrow } from "../../api/http.js";

export default function Cart() {
  const [activePanel, setActivePanel] = useState(null);
  const location = useLocation();
  const { cart, removeFromCart, clearCart } = useCart();
  const currentUser = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("currentUser");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const isAuthenticated = Boolean(currentUser?.email);
  const [formData, setFormData] = useState({
    returnDate: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const todayISO = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }, []);

  const closePanel = () => setActivePanel(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const borrowData = {
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
      };

      await createBorrow(borrowData);
      clearCart();
      setSubmitSuccess(true);
      setFormData({ returnDate: "", comment: "" });
    } catch (err) {
      setSubmitError("Помилка при оформленні. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={activePanel} onChange={setActivePanel} />

        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <div className={s.container}>
              <section className={s.cartSection}>
                <div className={s.cartHeader}>
                  <h1 className={s.cartTitle}>Ваш кошик</h1>
                  <span className={s.itemCount}>({cart.length})</span>
                </div>

                {cart.length === 0 && !submitSuccess && (
                  <p style={{ color: "#999", marginTop: "20px" }}>Кошик порожній</p>
                )}

                {submitSuccess && (
                  <p style={{ color: "#5a8", fontWeight: 600, marginTop: "20px" }}>
                    ✓ Позику успішно оформлено!
                  </p>
                )}

                <div className={s.itemsList}>
                  {cart.map((item) => (
                    <div key={item.id} className={s.cartItem}>

                      <div className={s.itemContent}>
                        <h3 className={s.itemName}>{item.name}</h3>
                        <p className={s.itemCategory}>{item.category}</p>
                      </div>

                      <div className={s.itemQuantity}>
                        <span className={s.quantityLabel}>{item.quantity} шт.</span>
                      </div>

                      <button
                        className={s.deleteBtn}
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Видалити ${item.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <aside className={s.formSection}>
                <h2 className={s.formTitle}>Оформлення позики</h2>

                {!isAuthenticated && (
                  <div className={s.authNotice}>
                    <p>Оформлення доступне лише для зареєстрованих користувачів.</p>
                    <p>
                      <Link to="/login" state={{ from: location.pathname }}>Увійти</Link>
                      {" або "}
                      <Link to="/signup" state={{ from: location.pathname }}>зареєструватися</Link>
                      {" з поштою @ucu.edu.ua"}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={s.form}>
                  <div className={s.formGroup}>
                    <label htmlFor="email" className={s.label}>
                      Корпоративна пошта
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={currentUser?.email || ""}
                      placeholder="fito.pn@ucu.edu.ua"
                      className={s.input}
                      required
                      disabled
                      readOnly
                    />
                  </div>

                  <div className={s.formGroup}>
                    <label htmlFor="returnDate" className={s.label}>
                      Дата повернення
                    </label>
                    <input
                      id="returnDate"
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleFormChange}
                      min={todayISO}
                      className={s.input}
                      required
                      disabled={submitting || !isAuthenticated}
                    />
                  </div>

                  <div className={s.formGroup}>
                    <label htmlFor="comment" className={s.label}>
                      Коментар (опціонально)
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleFormChange}
                      placeholder="Для чого береш обладнання..."
                      className={s.textarea}
                      rows={4}
                      disabled={submitting || !isAuthenticated}
                    />
                  </div>

                  <div className={s.quantityInfo}>
                    <span className={s.quantityLabel}>Кількість позицій:</span>
                    <span className={s.quantityValue}>{cart.length} шт.</span>
                  </div>

                  {submitError && (
                    <p style={{ color: "red", fontSize: "13px", margin: "4px 0" }}>{submitError}</p>
                  )}

                  <button
                    type="submit"
                    className={s.submitBtn}
                    disabled={submitting || cart.length === 0 || !isAuthenticated}
                    style={{ opacity: (submitting || cart.length === 0 || !isAuthenticated) ? 0.6 : 1 }}
                  >
                    {submitting ? "Оформлення..." : "Підтвердити позику"}
                  </button>

                  <p className={s.disclaimer}>
                    Натискаючи кнопку ви погоджуєтесь з правилами позики та
                    обробкою особистої інформації
                  </p>
                </form>
              </aside>
            </div>
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>

        {activePanel && (
          <div className={s.overlay} role="dialog" aria-label="Panel">
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <div className={s.panelTitle}>
                  {activePanel === "equipment" && "Equipment"}
                  {activePanel === "account" && "Account"}
                  {activePanel === "docs" && "Docs"}
                </div>
                <button className={s.close} type="button" onClick={closePanel} aria-label="Close">✕</button>
              </div>
              <div className={s.panelBody}>
                <p className={s.placeholder}>Panel content…</p>
              </div>
            </div>
            <button className={s.backdrop} type="button" onClick={closePanel} aria-label="Close panel" />
          </div>
        )}
      </div>
    </div>
  );
}