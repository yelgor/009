import s from "../Cart.module.css";

export default function CartItem({ item, onRemove }) {
  return (
    <div className={s.cartItem}>
      <div className={s.itemContent}>
        <h3 className={s.itemName}>{item.name}</h3>
        <p className={s.itemCategory}>{item.category}</p>
      </div>

      <div className={s.itemQuantity}>
        <span className={s.quantityLabel}>{item.quantity} шт.</span>
      </div>

      <button
        className={s.deleteBtn}
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Видалити ${item.name}`}
      >
        🗑️
      </button>
    </div>
  );
}
