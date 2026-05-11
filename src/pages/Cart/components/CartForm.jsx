import { Link } from "react-router-dom";
import s from "../Cart.module.css";

export default function CartForm({
  currentUser,
  isAuthenticated,
  formData,
  onChange,
  onSubmit,
  todayISO,
  submitting,
  submitError,
  itemCount,
  locationPath,
}) {
  return (
    <aside className={s.formSection}>
      <h2 className={s.formTitle}>Оформлення позики</h2>

      {!isAuthenticated && (
        <div className={s.authNotice}>
          <p>Оформлення доступне лише для зареєстрованих користувачів.</p>
          <p>
            <Link to="/login" state={{ from: locationPath }}>Увійти</Link>
            {" або "}
            <Link to="/signup" state={{ from: locationPath }}>зареєструватися</Link>
            {" з поштою @ucu.edu.ua"}
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} className={s.form}>
        <div className={s.formGroup}>
          <label htmlFor="email" className={s.label}>Корпоративна пошта</label>
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
          <label htmlFor="returnDate" className={s.label}>Дата повернення</label>
          <input
            id="returnDate"
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={onChange}
            min={todayISO}
            className={s.input}
            required
            disabled={submitting || !isAuthenticated}
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="comment" className={s.label}>Коментар (опціонально)</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={onChange}
            placeholder="Для чого береш обладнання..."
            className={s.textarea}
            rows={4}
            disabled={submitting || !isAuthenticated}
          />
        </div>

        <div className={s.quantityInfo}>
          <span className={s.quantityLabel}>Кількість позицій:</span>
          <span className={s.quantityValue}>{itemCount} шт.</span>
        </div>

        {submitError && <p className={s.errorMessage}>{submitError}</p>}

        <button
          type="submit"
          className={s.submitBtn}
          disabled={submitting || itemCount === 0 || !isAuthenticated}
        >
          {submitting ? "Оформлення..." : "Підтвердити позику"}
        </button>

        <p className={s.disclaimer}>
          Натискаючи кнопку ви погоджуєтесь з правилами позики та обробкою особистої інформації
        </p>
      </form>
    </aside>
  );
}
