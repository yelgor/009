import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        {/* LEFT: 009 + Equipment рядом */}
        <div className={s.left}>
          <NavLink to="/" className={s.logo}>
            009
          </NavLink>

          <nav className={s.nav}>
            <NavLink
              to="/equipment"
              className={({ isActive }) => (isActive ? s.navBtnActive : s.navBtn)}
            >
              Equipment
            </NavLink>
          </nav>
        </div>

        {/* RIGHT: icons + auth */}
        <div className={s.right}>
          <NavLink to="/my-borrows" className={s.iconLink} aria-label="My borrows">
            📋
          </NavLink>

          <NavLink to="/cart" className={s.iconLink} aria-label="Cart">
            🛒
          </NavLink>

          <div className={s.auth}>
            <NavLink to="/login" className={s.btnGhost}>
              Sign In
            </NavLink>
            <NavLink to="/signup" className={s.btnPrimary}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
