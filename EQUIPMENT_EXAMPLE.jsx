/**
 * ПРИКЛАД: Як розширити сторінку обладнання (Equipment)
 * 
 * Це файл з кодом-прикладом того, як студенти можуть додавати товари до кошика
 * з будь-якої сторінки у додатку
 */

import { useCart } from "../../context/CartContext";

export default function EquipmentList() {
  const { addToCart } = useCart();

  // Приклад списку обладнання з бази даних
  const equipment = [
    {
      id: 1,
      name: "SRM32 Blue Pill",
      category: "Мікроконтролер",
      description: "Мініатюрна платформа для розробки мікроконтролерних систем",
      image: "📟",
      available: true,
    },
    {
      id: 2,
      name: "Логічний аналізатор",
      category: "Вимірювальний приклад",
      description: "Пристрій для аналізу цифрових сигналів",
      image: "🔍",
      available: true,
    },
    {
      id: 3,
      name: "Мультиметр",
      category: "Вимірювальний прилад",
      description: "Цифровий мультиметр для вимірювання напруги, струму та опору",
      image: "🔧",
      available: true,
    },
  ];

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: 1,
      image: item.image,
    });

    // Опціонально: показати повідомлення про успішне додавання
    console.log(`${item.name} додано до кошика`);
    // Можна додати toast notification тут
  };

  return (
    <div className="equipment-container">
      <h1>Обладнання для позики</h1>

      <div className="equipment-grid">
        {equipment.map((item) => (
          <div key={item.id} className="equipment-card">
            <div className="equipment-image">{item.image}</div>
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="description">{item.description}</p>

            <div className="card-footer">
              <span className="availability">
                {item.available ? "✓ Доступне" : "✗ Не доступне"}
              </span>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={!item.available}
                className="add-btn"
              >
                Додати до кошика
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * CSS для цього компонента:
 * 
 * .equipment-container {
 *   padding: 32px;
 *   max-width: 1200px;
 *   margin: 0 auto;
 * }
 * 
 * .equipment-grid {
 *   display: grid;
 *   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
 *   gap: 24px;
 *   margin-top: 24px;
 * }
 * 
 * .equipment-card {
 *   padding: 20px;
 *   background: rgba(255, 255, 255, 0.6);
 *   border: 1px solid rgba(90, 90, 90, 0.12);
 *   border-radius: 14px;
 *   display: flex;
 *   flex-direction: column;
 *   gap: 12px;
 * }
 * 
 * .equipment-image {
 *   font-size: 64px;
 *   text-align: center;
 *   line-height: 1;
 * }
 * 
 * .equipment-card h3 {
 *   font-size: 18px;
 *   font-weight: 500;
 *   color: var(--text);
 *   margin: 0;
 * }
 * 
 * .category {
 *   font-size: 13px;
 *   color: var(--muted);
 *   margin: 0;
 * }
 * 
 * .description {
 *   font-size: 14px;
 *   color: var(--text);
 *   margin: 0;
 *   flex: 1;
 * }
 * 
 * .card-footer {
 *   display: flex;
 *   align-items: center;
 *   justify-content: space-between;
 *   gap: 12px;
 *   margin-top: auto;
 *   padding-top: 12px;
 *   border-top: 1px solid rgba(90, 90, 90, 0.12);
 * }
 * 
 * .availability {
 *   font-size: 12px;
 *   color: var(--accent-green);
 *   font-weight: 500;
 * }
 * 
 * .add-btn {
 *   padding: 8px 16px;
 *   background: var(--cta);
 *   color: var(--ctaText);
 *   border: none;
 *   border-radius: 8px;
 *   font-size: 13px;
 *   font-weight: 500;
 *   cursor: pointer;
 *   transition: all 0.2s;
 * }
 * 
 * .add-btn:hover {
 *   background: #6d68a3;
 * }
 * 
 * .add-btn:disabled {
 *   opacity: 0.5;
 *   cursor: not-allowed;
 * }
 */
