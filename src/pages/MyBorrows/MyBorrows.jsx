import { useState, useEffect } from "react";
import s from "./MyBorrows.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { apiFetch, getBorrowsByEmail, deleteBorrow } from "../../api/http.js";

export default function MyBorrows() {
  const [activePanel, setActivePanel] = useState(null);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  const closePanel = () => setActivePanel(null);

  useEffect(() => {
    let email = "";
    try {
      const rawUser = sessionStorage.getItem("currentUser");
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      email = parsedUser?.email || "";
    } catch {
      email = "";
    }

    setCurrentUserEmail(email);

    if (!email) {
      setBorrows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getBorrowsByEmail(email)
      .then((data) => {
        setBorrows(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openDeleteConfirm = (row) => {
    setConfirmTarget(row);
    setConfirmError(null);
  };

  const closeDeleteConfirm = () => {
    if (isDeleting) return;
    setConfirmTarget(null);
    setConfirmError(null);
  };

  const handleDeleteBorrow = async () => {
    if (!confirmTarget) return;

    const { borrowId, itemIndex } = confirmTarget;
    const sourceBorrow = borrows.find((b) => b.id === borrowId);
    if (!sourceBorrow) {
      setConfirmTarget(null);
      return;
    }

    try {
      setIsDeleting(true);
      setConfirmError(null);

      const items = Array.isArray(sourceBorrow.items) ? sourceBorrow.items : [];

      if (items.length <= 1) {
        await deleteBorrow(borrowId);
        setBorrows((prev) => prev.filter((b) => b.id !== borrowId));
      } else {
        const nextItems = items.filter((_, index) => index !== itemIndex);

        await apiFetch(`/borrows/${borrowId}`, {
          method: "PATCH",
          body: JSON.stringify({ items: nextItems }),
        });

        setBorrows((prev) =>
          prev.map((b) => (b.id === borrowId ? { ...b, items: nextItems } : b))
        );
      }

      setConfirmTarget(null);
    } catch (err) {
      setConfirmError("Помилка при видаленні. Спробуйте ще раз.");
    } finally {
      setIsDeleting(false);
    }
  };

  const borrowRows = borrows.flatMap((borrow) => {
    const items = Array.isArray(borrow.items) ? borrow.items : [];

    if (items.length === 0) {
      return [
        {
          rowKey: `${borrow.id}-empty`,
          borrowId: borrow.id,
          itemName: "—",
          itemCategory: "—",
          borrowDate: borrow.borrowDate,
          returnDate: borrow.returnDate,
          status: borrow.status,
          quantity: 1,
        },
      ];
    }

    return items.map((item, index) => ({
      rowKey: `${borrow.id}-${item.id ?? "item"}-${index}`,
      borrowId: borrow.id,
      itemIndex: index,
      itemId: item.id,
      itemName: item.name || "—",
      itemCategory: item.category || "—",
      borrowDate: borrow.borrowDate,
      returnDate: borrow.returnDate,
      status: borrow.status,
      quantity: item.quantity || 1,
    }));
  });

  const uniqueCategories = new Set(
    borrowRows.map((row) => row.itemCategory).filter(Boolean)
  );
  const totalTypes = uniqueCategories.size;
  const totalUnits = borrowRows.reduce((sum, row) => sum + row.quantity, 0);

  const validReturnDates = borrows
    .map((item) => item.returnDate)
    .filter((date) => typeof date === "string" && date.length > 0);

  const nearestReturnDate =
    validReturnDates.length > 0
      ? validReturnDates.reduce((nearest, date) => (date < nearest ? date : nearest))
      : "—";

  const getStatusLabel = (status) => (status === "active" ? "Активна" : "Скоро здати");
  const getStatusClass = (status) => (status === "active" ? s.statusActive : s.statusSoon);

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={activePanel} onChange={setActivePanel} />

        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <div className={s.container}>
              <div className={s.header}>
                <h1 className={s.title}>Мої позики</h1>
              </div>

              {loading && <p style={{ color: "#999" }}>Завантаження...</p>}
              {error && <p style={{ color: "red" }}>Помилка: {error}</p>}
              {!loading && !error && !currentUserEmail && (
                <p style={{ color: "#999" }}>Увійдіть в акаунт, щоб бачити свої позики</p>
              )}
              {!loading && !error && currentUserEmail && borrows.length === 0 && (
                <p style={{ color: "#999" }}>У вас немає активних позик</p>
              )}

              <div className={s.borrowsList}>
                {borrowRows.map((row) => {
                  return (
                    <div key={row.rowKey} className={s.borrowItem}>
                      
                    <div className={s.itemContent}>
                      <p className={s.itemName}>{row.itemName}</p>
                      <p className={s.itemCategory}>{row.itemCategory}</p>
                    </div>

                    <div className={s.dateColumn}>
                      <span className={s.dateLabel}>Позичено</span>
                      <span className={s.dateValue}>{row.borrowDate || "—"}</span>
                    </div>

                    <div className={s.dateColumn}>
                      <span className={s.dateLabel}>Повернути до</span>
                      <span className={s.dateValue}>{row.returnDate || "—"}</span>
                    </div>

                    <div className={s.statusColumn}>
                      <button className={`${s.statusBtn} ${getStatusClass(row.status)}`}>
                        {getStatusLabel(row.status)}
                      </button>
                    </div>

                    <button
                      className={s.deleteBtn}
                      type="button"
                      onClick={() => openDeleteConfirm(row)}
                      aria-label={`Видалити позику: ${row.itemName}`}
                    >
                      🗑️
                    </button>
                    </div>
                  );
                })}
              </div>

              {!loading && borrows.length > 0 && (
                <div className={s.statistics}>
                  <div className={s.statsRow}>
                    <span className={s.statsLabel}>Всього видів обладнання:</span>
                    <span className={s.statsValue}>{totalTypes}</span>
                  </div>
                  <div className={s.statsRow}>
                    <span className={s.statsLabel}>Всього одиниць обладнання:</span>
                    <span className={s.statsValue}>{totalUnits} шт.</span>
                  </div>
                  <div className={s.statsRow}>
                    <span className={s.statsLabel}>Найближча дата повернення:</span>
                    <span className={s.statsValueDate}>{nearestReturnDate}</span>
                  </div>
                </div>
              )}
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
                <button className={s.close} type="button" onClick={closePanel} aria-label="Close">
                  ✕
                </button>
              </div>
              <div className={s.panelBody}>
                <p className={s.placeholder}>Panel content…</p>
              </div>
            </div>
            <button className={s.backdrop} type="button" onClick={closePanel} aria-label="Close panel" />
          </div>
        )}

        {confirmTarget && (
          <div className={s.confirmOverlay} role="dialog" aria-modal="true" aria-label="Підтвердження повернення">
            <button
              className={s.confirmBackdrop}
              type="button"
              onClick={closeDeleteConfirm}
              aria-label="Закрити підтвердження"
            />

            <div className={s.confirmModal}>
              <h3 className={s.confirmTitle}>Чи ти здав це обладнання?</h3>
              <p className={s.confirmItemName}>{confirmTarget.itemName}</p>

              {confirmError && <p className={s.confirmError}>{confirmError}</p>}

              <div className={s.confirmActions}>
                <button
                  className={s.confirmNoBtn}
                  type="button"
                  onClick={closeDeleteConfirm}
                  disabled={isDeleting}
                >
                  Ні
                </button>

                <button
                  className={s.confirmYesBtn}
                  type="button"
                  onClick={handleDeleteBorrow}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Обробка..." : "Так"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
