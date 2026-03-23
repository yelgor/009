import { useEffect, useState } from "react";
import s from "./Hero.module.css";

import logo009 from "../../assets/logo-009.png";
import realPhoto from "../../assets/real.jpeg";

export default function Hero() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    useEffect(() => {
        if (!isAboutOpen) return undefined;

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsAboutOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isAboutOpen]);

  return (
        <>
            <main className={s.hero}>
                <img className={s.logo} src={logo009} alt="009 emblem" />

                <h1 className={s.title}>UCU LABORATORY ROOM</h1>
                <p className={s.subtitle}>Browse. Reserve. Submit. Pick up</p>

                <button className={s.cta} type="button" onClick={() => setIsAboutOpen(true)}>
                    LEARN MORE
                </button>
            </main>

            {isAboutOpen && (
                <div className={s.modalOverlay} role="dialog" aria-modal="true" aria-label="Про лабораторію">
                    <button
                        type="button"
                        className={s.modalBackdrop}
                        onClick={() => setIsAboutOpen(false)}
                        aria-label="Закрити"
                    />

                    <div className={s.modalCard}>
                        <button
                            type="button"
                            className={s.modalClose}
                            onClick={() => setIsAboutOpen(false)}
                            aria-label="Закрити вікно"
                        >
                            ✕
                        </button>

                        <h2 className={s.modalTitle}>Місце чудес ✨</h2>
                        <p className={s.modalText}>
                            Лабораторія 009 це простір для практики з embedded, мікроконтролерами та
                            електронікою. Тут можна переглянути доступне обладнання, зарезервувати потрібні
                            позиції й оформити позику для навчальних проєктів.
                        </p>

                        <img className={s.modalImage} src={realPhoto} alt="Лабораторія 009" />

                        <button type="button" className={s.modalAction} onClick={() => setIsAboutOpen(false)}>
                            Закрити
                        </button>
                    </div>
                </div>
            )}
        </>
  );
}
