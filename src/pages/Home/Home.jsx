import s from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import MarketingIntro from "../../components/MarketingIntro/MarketingIntro.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function Home() {
  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />
        <div className={s.body}>
          <main className={s.main}>
            <MarketingIntro />
          </main>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
