import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createEquipment } from "../../api/http.js";
import ImageDropzone from "./components/ImageDropzone.jsx";
import s from "./AddEquipment.module.css";

const initialForm = {
  title: "",
  category: "",
  image: "",
  imageData: "",
  description: "",
  specs: "",
  available: true,
};

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Не вдалося прочитати файл."));
    reader.readAsDataURL(file);
  });
}

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

  const handleFileSelect = async (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Оберіть файл зображення.");
      return;
    }

    try {
      const imageData = await readImageFile(file);
      setForm((prev) => ({ ...prev, image: file.name, imageData }));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearImage = () => {
    setForm((prev) => ({ ...prev, image: "", imageData: "" }));
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
        image: form.image.trim() || null,
        imageData: form.imageData || null,
        description: form.description.trim(),
        specs: form.specs.trim(),
        available: form.available,
      });
      navigate(`/equipment/${created.id}`);
    } catch {
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

              <div className={s.field}>
                <span className={s.label}>Зображення</span>
                <ImageDropzone
                  previewSrc={form.imageData}
                  fileName={form.image}
                  onFileSelect={handleFileSelect}
                  onClear={clearImage}
                />
              </div>

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
