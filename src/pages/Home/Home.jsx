import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Home.module.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);

  const closePanel = () => setActivePanel(null);

  const handlePanelClick = (id) => {
    if (id === "equipment") {
      navigate("/equipment");
    } else {
      setActivePanel(activePanel === id ? null : id);
    }
  };

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
        <Navbar active={activePanel} onChange={handlePanelClick} />

        {}
        <div className={s.body} aria-hidden={Boolean(activePanel)}>
          <main className={s.main}>
            <Hero />
          </main>

          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
