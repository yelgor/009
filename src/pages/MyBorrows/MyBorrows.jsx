import { useState, useEffect } from "react";
import s from "./MyBorrows.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getBorrowsByEmail, deleteBorrow, updateBorrowItems } from "../../api/http.js";
import { useAuth } from "../../context/AuthContext.jsx";
import BorrowList from "./components/BorrowList.jsx";
import BorrowStatistics from "./components/BorrowStatistics.jsx";
import DeleteBorrowModal from "./components/DeleteBorrowModal.jsx";

function toBorrowRows(borrows) {
  return borrows.flatMap((borrow) => {
    const items = Array.isArray(borrow.items) ? borrow.items : [];

    if (items.length === 0) {
      return [{
        rowKey: `${borrow.id}-empty`,
        borrowId: borrow.id,
        itemName: "—",
        itemCategory: "—",
        borrowDate: borrow.borrowDate,
        returnDate: borrow.returnDate,
        status: borrow.status,
        quantity: 1,
      }];
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
}

export default function MyBorrows() {
  const { currentUser } = useAuth();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  useEffect(() => {
    const email = currentUser?.email || "";

    if (!email) {
      setBorrows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getBorrowsByEmail(email)
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser?.email]);

  const closeDeleteConfirm = () => {
    if (isDeleting) return;
    setConfirmTarget(null);
    setConfirmError(null);
  };

  const handleDeleteBorrow = async () => {
    if (!confirmTarget) return;

    const { borrowId, itemIndex } = confirmTarget;
    const sourceBorrow = borrows.find((borrow) => borrow.id === borrowId);
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
        setBorrows((prev) => prev.filter((borrow) => borrow.id !== borrowId));
      } else {
        const nextItems = items.filter((_, index) => index !== itemIndex);
        await updateBorrowItems(borrowId, nextItems);
        setBorrows((prev) => prev.map((borrow) => (borrow.id === borrowId ? { ...borrow, items: nextItems } : borrow)));
      }

      setConfirmTarget(null);
    } catch {
      setConfirmError("Помилка при видаленні. Спробуйте ще раз.");
    } finally {
      setIsDeleting(false);
    }
  };

  const borrowRows = toBorrowRows(borrows);
  const totalTypes = new Set(borrowRows.map((row) => row.itemCategory).filter(Boolean)).size;
  const totalUnits = borrowRows.reduce((sum, row) => sum + row.quantity, 0);
  const validReturnDates = borrows.map((item) => item.returnDate).filter((date) => typeof date === "string" && date.length > 0);
  const nearestReturnDate = validReturnDates.length > 0
    ? validReturnDates.reduce((nearest, date) => (date < nearest ? date : nearest))
    : "—";

  const getStatusLabel = (status) => (status === "active" ? "Активна" : "Скоро здати");
  const getStatusClass = (status) => (status === "active" ? s.statusActive : s.statusSoon);

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />
        <div className={s.body}>
          <main className={s.main}>
            <div className={s.container}>
              <div className={s.header}>
                <h1 className={s.title}>Мої позики</h1>
              </div>

              {loading && <p className={s.mutedMessage}>Завантаження...</p>}
              {error && <p className={s.errorMessage}>Помилка: {error}</p>}
              {!loading && !error && !currentUser?.email && <p className={s.mutedMessage}>Увійдіть в акаунт, щоб бачити свої позики</p>}
              {!loading && !error && currentUser?.email && borrows.length === 0 && <p className={s.mutedMessage}>У вас немає активних позик</p>}

              <BorrowList
                rows={borrowRows}
                getStatusLabel={getStatusLabel}
                getStatusClass={getStatusClass}
                onDelete={(row) => {
                  setConfirmTarget(row);
                  setConfirmError(null);
                }}
              />

              {!loading && borrows.length > 0 && (
                <BorrowStatistics totalTypes={totalTypes} totalUnits={totalUnits} nearestReturnDate={nearestReturnDate} />
              )}
            </div>
          </main>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>

        <DeleteBorrowModal
          target={confirmTarget}
          error={confirmError}
          isDeleting={isDeleting}
          onClose={closeDeleteConfirm}
          onConfirm={handleDeleteBorrow}
        />
      </div>
    </div>
  );
}
