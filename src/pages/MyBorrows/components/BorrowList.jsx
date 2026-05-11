import BorrowRow from "./BorrowRow.jsx";
import s from "../MyBorrows.module.css";

export default function BorrowList({ rows, getStatusLabel, getStatusClass, onDelete }) {
  return (
    <div className={s.borrowsList}>
      {rows.map((row) => (
        <BorrowRow
          key={row.rowKey}
          row={row}
          getStatusLabel={getStatusLabel}
          getStatusClass={getStatusClass}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
