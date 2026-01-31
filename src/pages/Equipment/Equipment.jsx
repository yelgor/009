import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Equipment.module.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { equipmentData } from "../../data/equipmentData.js";

export default function Equipment() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);

  const closePanel = () => setActivePanel(null);

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
              <h1 style={{ textAlign: "center", marginBottom: "35px", color: "#999", margin: "0 0 35px 0" }}>Available equipment</h1>
              
              <div style={{ 
                width: "100%",
                maxWidth: "1200px",
                flex: 1,
                overflowY: "auto",
                paddingRight: "10px"
              }}>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "18px"
                }}>
                  {equipmentData.map((item) => (
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
                        overflow: "hidden"
                      }}
                      onClick={() => navigate(`/equipment/${item.id}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#8B7BB4";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9f9f9";
                        e.currentTarget.style.color = "inherit";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
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
                      <p style={{ margin: "10px 0 0 0", fontSize: "14px", fontWeight: "500" }}>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
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

                <button
                  className={s.close}
                  type="button"
                  onClick={closePanel}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className={s.panelBody}>
                <p className={s.placeholder}>Panel content…</p>
              </div>
            </div>

            <button
              className={s.backdrop}
              type="button"
              onClick={closePanel}
              aria-label="Close panel"
            />
          </div>
        )}
      </div>
    </div>
  );
}
