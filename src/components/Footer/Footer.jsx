import s from "./Footer.module.css";
import ucuEmblem from "../../assets/ucu-emblem.png";
import asfEmblem from "../../assets/asf-emblem.png";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.row}>
          <img className={s.logo} src={ucuEmblem} alt="UK logo" />
          <span className={s.divider} aria-hidden="true" />
          <img className={s.logoWide} src={asfEmblem} alt="Applied Sciences Faculty" />
        </div>
      </div>
    </footer>
  );
}