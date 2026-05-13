import { resolveEquipmentImageSrc } from "../../../utils/equipmentImageSrc.js";
import s from "../Equipment.module.css";

export default function EquipmentCard({ item, onOpen }) {
  const imageSrc = resolveEquipmentImageSrc(item);
  const isAvailable = item.available !== false;

  return (
    <button
      type="button"
      className={`${s.card} ${!isAvailable ? s.cardUnavailable : ""}`}
      onClick={() => onOpen(item.id)}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={item.title} className={s.cardImage} />
      ) : (
        <div className={s.imagePlaceholder}>Фото</div>
      )}
      <span className={s.cardTitle}>{item.title}</span>
      {!isAvailable && <span className={s.unavailableLabel}>Недоступно</span>}
    </button>
  );
}
