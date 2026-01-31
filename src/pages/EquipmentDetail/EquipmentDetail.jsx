import { useParams, useNavigate } from "react-router-dom";
import s from "./EquipmentDetail.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { equipmentData } from "../../data/equipmentData.js";

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipment = equipmentData.find((item) => item.id === parseInt(id));

  if (!equipment) {
    return <div>Обладнання не знайдено</div>;
  }

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
                  {equipment.image ? (
                    <img src={equipment.image} alt={equipment.name} className={s.image} />
                  ) : (
                    <div className={s.imagePlaceholder}>Фото буде додано</div>
                  )}
                </div>

                <div className={s.infoSection}>
                  <h1>{equipment.name}</h1>
                  <p className={s.description}>{equipment.description}</p>
                  
                  <div className={s.specs}>
                    <h2>Специфікація</h2>
                    <p>{equipment.specs}</p>
                  </div>

                  <button className={s.reserveBtn}>У кошик</button>
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
