import styles from "./Footer.module.css";

import ucuLogo from "../../assets/ucu-emblem.png";
import asfLogo from "../../assets/asf-emblem.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.logos}>
        <img className={styles.ucu} src={ucuLogo} alt="UCU" />
        <div className={styles.vline} />
        <img className={styles.asf} src={asfLogo} alt="Applied Sciences Faculty" />
      </div>
    </footer>
  );
}
