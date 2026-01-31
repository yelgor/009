import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import s from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={s.page}>
      <Navbar />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
