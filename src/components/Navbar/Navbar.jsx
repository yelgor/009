import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const navItems = [
  { id: "/", label: "Home" },
  { id: "/equipment", label: "Equipment" },
];

export default function Navbar() {
  return (
    <header className={s.header}>
      {/* Лого / кнопка (оставляем как "кнопку", чтобы не ломать стили) */}
      <button type="button" className={s.logoBtn}>
        009
      </button>

      <nav className={s.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.id}
            className={({ isActive }) => `${s.link} ${isActive ? s.active : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Кнопки авторизации */}
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
