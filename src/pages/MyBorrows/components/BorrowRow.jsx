import s from "../MyBorrows.module.css";

export default function BorrowRow({ row, getStatusLabel, getStatusClass, onDelete }) {
  return (
    <div className={s.borrowItem}>
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
        <button className={`${s.statusBtn} ${getStatusClass(row.status)}`} type="button">
          {getStatusLabel(row.status)}
        </button>
      </div>

      <button
        className={s.deleteBtn}
        type="button"
        onClick={() => onDelete(row)}
        aria-label={`Видалити позику: ${row.itemName}`}
      >
        🗑️
      </button>
    </div>
  );
}
