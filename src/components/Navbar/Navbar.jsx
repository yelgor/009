import s from "./Navbar.module.css";

const items = [
  { id: "equipment", label: "Equipment" },
  { id: "account", label: "Account" },
  { id: "docs", label: "Docs" },
];

export default function Navbar({ active, onChange }) {
  return (
    <header className={s.header}>
      <button className={s.burger} aria-label="Open menu" type="button">
        <span />
        <span />
        <span />
      </button>

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
      </nav>
    </header>
  );
}
