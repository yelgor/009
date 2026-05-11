import s from "../MyBorrows.module.css";

export default function BorrowStatistics({ totalTypes, totalUnits, nearestReturnDate }) {
  return (
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
  );
}
