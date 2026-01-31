import { NavLink } from 'react-router-dom';
import s from "./Navbar.module.css";

const navItems = [
  { id: "/", label: "Home" },
  { id: "/equipment", label: "Equipment" },
  { id: "/account", label: "Account" },
  { id: "/docs", label: "Docs" },
];

export default function Navbar() {
  return (
    <header className={s.header}>
      <button className={s.burger} aria-label="Open menu" type="button">
        <span />
        <span />
        <span />
      </button>

      <nav className={s.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.id}
            className={({ isActive }) => 
              `${s.link} ${isActive ? s.active : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      {/* Додаємо кнопки авторизації */}
      <div className={s.authButtons}>
        <NavLink 
          to="/login" 
          className={({ isActive }) => 
            `${s.loginButton} ${isActive ? s.active : ""}`
          }
        >
          Sign In
        </NavLink>
        <NavLink 
          to="/signup" 
          className={({ isActive }) => 
            `${s.signupButton} ${isActive ? s.active : ""}`
          }
        >
          Sign Up
        </NavLink>
      </div>
    </header>
  );
}