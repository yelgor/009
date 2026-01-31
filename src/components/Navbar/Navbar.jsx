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
      {/* Лого */}
      <NavLink to="/" className={s.logoBtn} aria-label="Home">
        009
      </NavLink>

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

        {/* My borrows */}
        <NavLink to="/my-borrows" className={s.cartLink} aria-label="My borrows">
          📋
        </NavLink>

        {/* Cart */}
        <NavLink to="/cart" className={s.cartLink} aria-label="Go to cart">
          🛒
        </NavLink>
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

