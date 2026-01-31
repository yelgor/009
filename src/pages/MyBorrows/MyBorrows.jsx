import { useState } from "react";
import s from "./MyBorrows.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function MyBorrows() {
  const [activePanel, setActivePanel] = useState(null);

  const closePanel = () => setActivePanel(null);

  // Mock data для активних позик
  const borrows = [
    {
      id: 1,
      name: "SRM32 Blue Pill",
      category: "Мікроконтролер",
      borrowDate: "27.01.2026",
      returnDate: "1.02.2026",
      status: "active",
      quantity: 1,
      image: "📟",
    },
    {
      id: 2,
      name: "Логічний аналізатор",
      category: "Вимірювальний приклад",
      borrowDate: "27.01.2026",
      returnDate: "23.03.2026",
      status: "soon",
      quantity: 1,
      image: "🔍",
    },
  ];

  const handleDeleteBorrow = (id) => {
    console.log("Delete borrow:", id);
  };

  // Обчислення статистики
  const totalTypes = borrows.length;
  const totalUnits = borrows.reduce((sum, item) => sum + item.quantity, 0);
  
  // Знайти найближчу дату повернення
  const nearestReturnDate = borrows.length > 0 ? 
    borrows.reduce((nearest, item) => {
      if (!nearest) return item.returnDate;
      const itemDate = new Date(item.returnDate.split(".").reverse().join("-"));
      const nearestDate = new Date(nearest.split(".").reverse().join("-"));
      return itemDate < nearestDate ? item.returnDate : nearest;
    }, "") : "—";

  const getStatusLabel = (status) => {
    return status === "active" ? "Активна" : "Скоро здати";
  };

  const getStatusClass = (status) => {
    return status === "active" ? s.statusActive : s.statusSoon;
  };

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={activePanel} onChange={setActivePanel} />

        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <div className={s.container}>
              {/* Заголовок */}
              <div className={s.header}>
                <h1 className={s.title}>Мої позики</h1>
              </div>

              {/* Список позик */}
              <div className={s.borrowsList}>
                {borrows.map((item) => (
                  <div key={item.id} className={s.borrowItem}>
                    {/* Картинка */}
                    <div className={s.itemImage}>{item.image}</div>

                    {/* Контент */}
                    <div className={s.itemContent}>
                      <h3 className={s.itemName}>{item.name}</h3>
                      <p className={s.itemCategory}>{item.category}</p>
                    </div>

                    {/* Дата позичення */}
                    <div className={s.dateColumn}>
                      <span className={s.dateLabel}>Позичено</span>
                      <span className={s.dateValue}>{item.borrowDate}</span>
                    </div>

                    {/* Дата повернення */}
                    <div className={s.dateColumn}>
                      <span className={s.dateLabel}>Повернути до</span>
                      <span className={s.dateValue}>{item.returnDate}</span>
                    </div>

                    {/* Статус */}
                    <div className={s.statusColumn}>
                      <button
                        className={`${s.statusBtn} ${getStatusClass(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </button>
                    </div>

                    {/* Кнопка видалення */}
                    <button
                      className={s.deleteBtn}
                      type="button"
                      onClick={() => handleDeleteBorrow(item.id)}
                      aria-label={`Видалити ${item.name}`}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {/* Статистика */}
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
            </div>
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>

        {/* Panel overlay */}
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
