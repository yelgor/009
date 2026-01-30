import { Link } from "react-router-dom";
import s from "./Navbar.module.css";

const items = [
  { id: "equipment", label: "Equipment" },
  { id: "account", label: "Account" },
  { id: "docs", label: "Docs" },
];

export default function Navbar({ active, onChange }) {
  return (
    <header className={s.header}>
      <Link to="/" className={s.logo}>
        <button className={s.burger} aria-label="Open menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </Link>

      <nav className={s.nav}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className={`${s.link} ${active === it.id ? s.active : ""}`}
            onClick={() => onChange(active === it.id ? null : it.id)}
          >
            {it.label}
          </button>
        ))}

        <Link to="/my-borrows" className={s.cartLink} aria-label="My borrows">
          📋
        </Link>

        <Link to="/cart" className={s.cartLink} aria-label="Go to cart">
          🛒
        </Link>
      </nav>
    </header>
  );
}
