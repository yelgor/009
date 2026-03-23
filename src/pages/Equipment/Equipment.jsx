import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Equipment.module.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getEquipment } from "../../api/http.js";

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

export default function Equipment() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closePanel = () => setActivePanel(null);

  useEffect(() => {
    getEquipment()
      .then((data) => setEquipmentList(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closePanel();
    };
    if (activePanel) {
      document.addEventListener("keydown", onKeyDown);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }
    return undefined;
  }, [activePanel]);

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar active={activePanel} onChange={setActivePanel} />

        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <div style={{ width: "100%", padding: "20px 20px", display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
              <h1 style={{ textAlign: "center", color: "#999", margin: "0 0 35px 0" }}>Available equipment</h1>

              {loading && <p style={{ color: "#999" }}>Завантаження...</p>}
              {error && <p style={{ color: "red" }}>Помилка: {error}</p>}

              {!loading && !error && (
                <div style={{ width: "100%", maxWidth: "1200px", flex: 1, overflowY: "auto", paddingRight: "10px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "18px" }}>
                    {equipmentList.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          padding: "15px",
                          border: "3px solid #8B7BB4",
                          borderRadius: "16px",
                          textAlign: "center",
                          backgroundColor: "#f9f9f9",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          minHeight: "280px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          overflow: "hidden",
                          opacity: item.available === false ? 0.5 : 1,
                        }}
                        onClick={() => navigate(`/equipment/${item.id}`)}
                        onMouseEnter={(e) => {
                          if (item.available !== false) {
                            e.currentTarget.style.backgroundColor = "#8B7BB4";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f9f9f9";
                          e.currentTarget.style.color = "inherit";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {imageMap[item.image] ? (
                          <img
                            src={imageMap[item.image]}
                            alt={item.title}
                            style={{
                              width: "100%",
                              aspectRatio: "1 / 1",
                              objectFit: "cover",
                              borderRadius: "10px",
                              marginBottom: "10px"
                            }}
                          />
                        ) : (
                          <div style={{
                            width: "100%",
                            aspectRatio: "1 / 1",
                            backgroundColor: "#ddd",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#999"
                          }}>
                            Фото
                          </div>
                        )}
                        <p style={{ margin: "10px 0 0 0", fontSize: "14px", fontWeight: "500" }}>{item.title}</p>
                        {item.available === false && (
                          <span style={{ fontSize: "11px", color: "#e05", marginTop: "4px" }}>Недоступно</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>

        {activePanel && (
          <div className={s.overlay} role="dialog" aria-label="Panel">
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <div className={s.panelTitle}>
                  {activePanel === "equipment" && "Equipment"}
                  {activePanel === "account" && "Account"}
                  {activePanel === "docs" && "Docs"}
                </div>
                <button className={s.close} type="button" onClick={closePanel} aria-label="Close">✕</button>
              </div>
              <div className={s.panelBody}>
                <p className={s.placeholder}>Panel content…</p>
              </div>
            </div>
            <button className={s.backdrop} type="button" onClick={closePanel} aria-label="Close panel" />
          </div>
        )}
      </div>
    </div>
  );
}
