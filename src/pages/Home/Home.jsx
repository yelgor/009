import { useEffect, useState } from "react";
import s from "./Home.module.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function Home() {
  const [activePanel, setActivePanel] = useState(null);

  const closePanel = () => setActivePanel(null);

  // Esc + lock body scroll when panel opened
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

        {}
        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <Hero />
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>

        {/* */}
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

            {}
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
