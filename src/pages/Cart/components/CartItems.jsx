import CartItem from "./CartItem.jsx";
import s from "../Cart.module.css";

export default function CartItems({ items, onRemove, submitSuccess }) {
  if (items.length === 0 && !submitSuccess) {
    return <p className={s.mutedMessage}>Кошик порожній</p>;
  }

  return (
    <div className={s.itemsList}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
