import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createEquipment } from "../../api/http.js";
import { equipmentImageOptions } from "../../utils/equipmentImages.js";
import s from "./AddEquipment.module.css";

const initialForm = {
  title: "",
  category: "",
  image: "",
  description: "",
  specs: "",
  available: true,
};

export default function AddEquipment() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = useMemo(
    () => form.title.trim() && form.category.trim() && form.description.trim(),
    [form]
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      setError("Заповніть назву, категорію та опис.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const created = await createEquipment({
        title: form.title.trim(),
        category: form.category.trim(),
        image: form.image || null,
        description: form.description.trim(),
        specs: form.specs.trim(),
        available: form.available,
      });
      navigate(`/equipment/${created.id}`);
    } catch (err) {
      setError("Не вдалося додати обладнання. Перевірте, що json-server запущений.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.frame}>
        <Navbar />
        <main className={s.main}>
          <section className={s.card}>
            <div className={s.header}>
              <h1 className={s.title}>Додати Equipment</h1>
              <button type="button" className={s.backButton} onClick={() => navigate("/equipment")}>
                Назад
              </button>
            </div>

            <form className={s.form} onSubmit={handleSubmit}>
              <label className={s.field}>
                <span className={s.label}>Назва</span>
                <input className={s.input} name="title" value={form.title} onChange={handleChange} />
              </label>

              <label className={s.field}>
                <span className={s.label}>Категорія</span>
                <input className={s.input} name="category" value={form.category} onChange={handleChange} />
              </label>

              <label className={s.field}>
                <span className={s.label}>Зображення</span>
                <select className={s.input} name="image" value={form.image} onChange={handleChange}>
                  <option value="">Без зображення</option>
                  {equipmentImageOptions.map((imageName) => (
                    <option key={imageName} value={imageName}>
                      {imageName}
                    </option>
                  ))}
                </select>
              </label>

              <label className={s.field}>
                <span className={s.label}>Опис</span>
                <textarea className={s.textarea} name="description" value={form.description} onChange={handleChange} />
              </label>

              <label className={s.field}>
                <span className={s.label}>Специфікація</span>
                <textarea className={s.textarea} name="specs" value={form.specs} onChange={handleChange} />
              </label>

              <label className={s.checkboxField}>
                <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
                <span>Доступне для позики</span>
              </label>

              {error && <p className={s.error}>{error}</p>}

              <button type="submit" className={s.submitButton} disabled={submitting || !canSubmit}>
                {submitting ? "Збереження..." : "Зберегти"}
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
