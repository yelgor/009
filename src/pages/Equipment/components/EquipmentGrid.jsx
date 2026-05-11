import EquipmentCard from "./EquipmentCard.jsx";
import s from "../Equipment.module.css";

export default function EquipmentGrid({ items, onOpen }) {
  if (items.length === 0) {
    return <p className={s.stateMessage}>Обладнання не знайдено</p>;
  }

  return (
    <div className={s.gridScroll}>
      <div className={s.grid}>
        {items.map((item) => (
          <EquipmentCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
