import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import s from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("currentUser");
      setCurrentUser(raw ? JSON.parse(raw) : null);
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
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
            <NavLink
              to="/equipment"
              className={({ isActive }) => (isActive ? s.navBtnActive : s.navBtn)}
            >
              Equipment
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
