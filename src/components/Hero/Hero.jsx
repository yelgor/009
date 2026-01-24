import s from "./Hero.module.css";

// ВАЖНО: положи файлы в src/assets с такими именами (см. ниже)
import logo009 from "../../assets/logo-009.png";
import ucuMark from "../../assets/ucu-emblem.png";
import asfMark from "../../assets/asf-emblem.png";

export default function Hero() {
  return (
      <main className={s.hero}>
          <img className={s.logo} src={logo009} alt="009 emblem"/>

          <h1 className={s.title}>UCU LABORATORY ROOM</h1>
          <p className={s.subtitle}>Browse. Reserve. Submit. Pick up</p>

          <button className={s.cta} type="button">
              LEARN MORE
          </button>

      </main>
  );
}
