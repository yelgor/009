import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import s from "./EquipmentDetail.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getEquipmentById } from "../../api/http.js";
import { useCart } from "../../context/CartContext.jsx";

import arduino from "../../assets/arduino.jpg";
import arduinoMega from "../../assets/arduino_mega.webp";
import arduinoShield from "../../assets/arduino_shild.webp";
import battery from "../../assets/battery.jpg";
import esp32 from "../../assets/esp32.jpg";
import hcsr04 from "../../assets/hc-sr04.jpg";
import lineSensor from "../../assets/line_sensor.webp";
import multimeter from "../../assets/multimeter.webp";
import solderingIron from "../../assets/soldering_iron.webp";
import stm32 from "../../assets/stm32-nucleo.webp";
import logicAnalyzer from "../../assets/logic_analyzer.jpeg";
import resistors from "../../assets/resistors.webp";
import capacitor from "../../assets/cond.webp";
import diode from "../../assets/diod.jpeg";
import transistor from "../../assets/transistor.jpeg";
import breadboard from "../../assets/breadboard.jpg";

const imageMap = {
  "arduino.jpg": arduino,
  "arduino_mega.webp": arduinoMega,
  "arduino_shild.webp": arduinoShield,
  "battery.jpg": battery,
  "esp32.jpg": esp32,
  "hc-sr04.jpg": hcsr04,
  "line_sensor.webp": lineSensor,
  "multimeter.webp": multimeter,
  "soldering_iron.webp": solderingIron,
  "stm32-nucleo.webp": stm32,
  "logic_analyzer.jpeg": logicAnalyzer,
  "resistors.webp": resistors,
  "cond.webp": capacitor,
  "diod.jpeg": diode,
  "transistor.jpeg": transistor,
  "breadboard.jpg": breadboard,
};

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
        setAdded(cart.some((i) => i.id === data.id));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

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

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>Завантаження...</div>;
  if (error) return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>Помилка: {error}</div>;
  if (!equipment) return <div style={{ padding: "40px", textAlign: "center" }}>Обладнання не знайдено</div>;

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={null} onChange={() => {}} />

        <div className={s.body}>
          <main className={s.main}>
            <div className={s.container}>
              <button className={s.backBtn} onClick={() => navigate("/equipment")}>
                ← Назад
              </button>

              <div className={s.content}>
                <div className={s.imageSection}>
                  {imageMap[equipment.image] ? (
                    <img
                      src={imageMap[equipment.image]}
                      alt={equipment.title}
                      className={s.image}
                    />
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

                  <p style={{ fontSize: "14px", color: equipment.available === false ? "#e05" : "#5a8", fontWeight: 500, margin: "8px 0 16px" }}>
                    {equipment.available === false ? "Недоступно" : "Доступно"}
                  </p>

                  <button
                    className={s.reserveBtn}
                    onClick={handleAddToCart}
                    disabled={equipment.available === false || added}
                    style={{ opacity: (equipment.available === false || added) ? 0.6 : 1, cursor: (equipment.available === false || added) ? "not-allowed" : "pointer" }}
                  >
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
