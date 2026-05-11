import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import s from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <NavLink to="/" className={s.logo}>
            009
          </NavLink>

          <nav className={s.nav}>
            <NavLink to="/equipment" className={({ isActive }) => (isActive ? s.navBtnActive : s.navBtn)}>
              Equipment
            </NavLink>
            <NavLink to="/equipment/new" className={({ isActive }) => (isActive ? s.navBtnActive : s.navBtn)}>
              Add equipment
            </NavLink>
          </nav>
        </div>

        <div className={s.right}>
          <NavLink to="/my-borrows" className={s.iconLink} aria-label="My borrows">
            📋
          </NavLink>

          <NavLink to="/cart" className={s.iconLink} aria-label="Cart">
            🛒
          </NavLink>

          <div className={s.auth}>
            {currentUser?.email ? (
              <>
                <span className={s.userEmail}>{currentUser.email}</span>
                <button type="button" className={s.btnGhost} onClick={handleLogout}>
                  Вийти
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={s.btnGhost}>
                  Sign In
                </NavLink>
                <NavLink to="/signup" className={s.btnPrimary}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
