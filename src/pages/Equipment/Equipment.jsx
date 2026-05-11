import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Equipment.module.css";

import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getEquipment } from "../../api/http.js";
import EquipmentGrid from "./components/EquipmentGrid.jsx";

export default function Equipment() {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEquipment()
      .then((data) => setEquipmentList(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />
        <div className={s.body}>
          <main className={s.main}>
            <section className={s.content}>
              <div className={s.headerRow}>
                <h1 className={s.title}>Available equipment</h1>
                <button type="button" className={s.addButton} onClick={() => navigate("/equipment/new")}>
                  + Add equipment
                </button>
              </div>

              {loading && <p className={s.stateMessage}>Завантаження...</p>}
              {error && <p className={s.errorMessage}>Помилка: {error}</p>}
              {!loading && !error && <EquipmentGrid items={equipmentList} onOpen={(id) => navigate(`/equipment/${id}`)} />}
            </section>
          </main>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
