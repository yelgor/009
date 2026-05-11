import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import s from "./EquipmentDetail.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getEquipmentById } from "../../api/http.js";
import { useCart } from "../../context/CartContext.jsx";
import { getEquipmentImage } from "../../utils/equipmentImages.js";

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getEquipmentById(id)
      .then((data) => {
        setEquipment(data);
        setAdded(cart.some((item) => item.id === data.id));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, cart]);

  const handleAddToCart = () => {
    if (!equipment || equipment.available === false) return;
    addToCart({
      id: equipment.id,
      name: equipment.title,
      category: equipment.category,
      image: equipment.image,
    });
    setAdded(true);
  };

  if (loading) return <div className={s.pageState}>Завантаження...</div>;
  if (error) return <div className={s.pageError}>Помилка: {error}</div>;
  if (!equipment) return <div className={s.pageState}>Обладнання не знайдено</div>;

  const imageSrc = getEquipmentImage(equipment.image);
  const isDisabled = equipment.available === false || added;

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />

        <div className={s.body}>
          <main className={s.main}>
            <div className={s.container}>
              <button className={s.backBtn} onClick={() => navigate("/equipment")}>
                ← Назад
              </button>

              <div className={s.content}>
                <div className={s.imageSection}>
                  {imageSrc ? (
                    <img src={imageSrc} alt={equipment.title} className={s.image} />
                  ) : (
                    <div className={s.imagePlaceholder}>Фото буде додано</div>
                  )}
                </div>

                <div className={s.infoSection}>
                  <h1>{equipment.title}</h1>
                  <p className={s.description}>{equipment.description}</p>

                  {equipment.specs && (
                    <div className={s.specs}>
                      <h2>Специфікація</h2>
                      <p>{equipment.specs}</p>
                    </div>
                  )}

                  <p className={equipment.available === false ? s.statusUnavailable : s.statusAvailable}>
                    {equipment.available === false ? "Недоступно" : "Доступно"}
                  </p>

                  <button className={s.reserveBtn} onClick={handleAddToCart} disabled={isDisabled}>
                    {added ? "✓ Вже в кошику" : "У кошик"}
                  </button>
                </div>
              </div>
            </div>
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
