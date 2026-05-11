import { useState } from "react";
import AppModal from "../Modal/AppModal.jsx";
import s from "./MarketingIntro.module.css";

import logo009 from "../../assets/logo-009.png";
import realPhoto from "../../assets/real.jpeg";

export default function MarketingIntro() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <section className={s.intro}>
        <img className={s.logo} src={logo009} alt="009 emblem" />
        <h1 className={s.title}>UCU LABORATORY ROOM</h1>
        <p className={s.subtitle}>Browse. Reserve. Submit. Pick up</p>
        <button className={s.cta} type="button" onClick={() => setIsAboutOpen(true)}>
          LEARN MORE
        </button>
      </section>

      <AppModal
        isOpen={isAboutOpen}
        onRequestClose={() => setIsAboutOpen(false)}
        title="Місце чудес"
        contentLabel="Про лабораторію"
      >
        <p className={s.modalText}>
          Лабораторія 009 — простір для практики з embedded, мікроконтролерами та електронікою.
          Тут можна переглянути доступне обладнання, зарезервувати потрібні позиції й оформити позику
          для навчальних проєктів.
        </p>
        <img className={s.modalImage} src={realPhoto} alt="Лабораторія 009" />
        <button type="button" className={s.modalAction} onClick={() => setIsAboutOpen(false)}>
          Закрити
        </button>
      </AppModal>
    </>
  );
}
