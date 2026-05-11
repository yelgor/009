import AppModal from "../../../components/Modal/AppModal.jsx";
import s from "../MyBorrows.module.css";

export default function DeleteBorrowModal({ target, error, isDeleting, onClose, onConfirm }) {
  return (
    <AppModal isOpen={Boolean(target)} onRequestClose={onClose} title="Чи ти здав це обладнання?">
      {target && <p className={s.confirmItemName}>{target.itemName}</p>}
      {error && <p className={s.confirmError}>{error}</p>}

      <div className={s.confirmActions}>
        <button className={s.confirmNoBtn} type="button" onClick={onClose} disabled={isDeleting}>
          Ні
        </button>
        <button className={s.confirmYesBtn} type="button" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Обробка..." : "Так"}
        </button>
      </div>
    </AppModal>
  );
}
