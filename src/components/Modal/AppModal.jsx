import Modal from "react-modal";
import s from "./AppModal.module.css";

if (typeof document !== "undefined") {
  Modal.setAppElement("#root");
}

export default function AppModal({ isOpen, onRequestClose, title, children, contentLabel = title }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      overlayClassName={s.overlay}
      className={s.modal}
      closeTimeoutMS={120}
    >
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <button type="button" className={s.closeButton} onClick={onRequestClose} aria-label="Закрити">
          ✕
        </button>
      </div>
      {children}
    </Modal>
  );
}
