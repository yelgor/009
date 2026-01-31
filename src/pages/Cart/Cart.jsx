import { useState } from "react";
import s from "./Cart.module.css";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function Cart() {
  const [activePanel, setActivePanel] = useState(null);
  const { cart, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    returnDate: "",
    comment: "",
  });

  const closePanel = () => setActivePanel(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Cart items:", cart);
    // Додати логіку для відправки даних
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={activePanel} onChange={setActivePanel} />

        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <div className={s.container}>
              {/* Ліва сторона - список товарів */}
              <section className={s.cartSection}>
                <div className={s.cartHeader}>
                  <h1 className={s.cartTitle}>Ваш кошик</h1>
                  <span className={s.itemCount}>({cart.length})</span>
                </div>

                <div className={s.itemsList}>
                  {cart.map((item) => (
                    <div key={item.id} className={s.cartItem}>
                      <div className={s.itemImage}>{item.image}</div>

                      <div className={s.itemContent}>
                        <h3 className={s.itemName}>{item.name}</h3>
                        <p className={s.itemCategory}>{item.category}</p>
                      </div>

                      <div className={s.itemQuantity}>
                        <span className={s.quantityLabel}>
                          {item.quantity} шт.
                        </span>
                      </div>

                      <button
                        className={s.deleteBtn}
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Видалити ${item.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Права сторона - форма оформлення */}
              <aside className={s.formSection}>
                <h2 className={s.formTitle}>Оформлення позики</h2>

                <form onSubmit={handleSubmit} className={s.form}>
                  {/* Корпоративна пошта */}
                  <div className={s.formGroup}>
                    <label htmlFor="email" className={s.label}>
                      Корпоративна пошта
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="fito.pn@ucu.edu.ua"
                      className={s.input}
                      required
                    />
                  </div>

                  {/* Дата повернення */}
                  <div className={s.formGroup}>
                    <label htmlFor="returnDate" className={s.label}>
                      Дата повернення
                    </label>
                    <input
                      id="returnDate"
                      type="text"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleFormChange}
                      placeholder="mm/dd/yyyy"
                      className={s.input}
                      required
                    />
                  </div>

                  {/* Коментар */}
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
                    />
                  </div>

                  {/* Кількість позицій */}
                  <div className={s.quantityInfo}>
                    <span className={s.quantityLabel}>Кількість позицій:</span>
                    <span className={s.quantityValue}>{cart.length} шт.</span>
                  </div>

                  {/* Кнопка відправки */}
                  <button type="submit" className={s.submitBtn}>
                    Підтвердити позику
                  </button>

                  {/* Зауваження */}
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

        {/* Panel overlay (якщо необхідно) */}
        {activePanel && (
          <div className={s.overlay} role="dialog" aria-label="Panel">
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <div className={s.panelTitle}>
                  {activePanel === "equipment" && "Equipment"}
                  {activePanel === "account" && "Account"}
                  {activePanel === "docs" && "Docs"}
                </div>

                <button
                  className={s.close}
                  type="button"
                  onClick={closePanel}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className={s.panelBody}>
                <p className={s.placeholder}>Panel content…</p>
              </div>
            </div>

            <button
              className={s.backdrop}
              type="button"
              onClick={closePanel}
              aria-label="Close panel"
            />
          </div>
        )}
      </div>
    </div>
  );
}
