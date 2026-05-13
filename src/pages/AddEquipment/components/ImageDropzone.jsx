import s from "../AddEquipment.module.css";

export default function ImageDropzone({ previewSrc, fileName, onFileSelect, onClear }) {
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
    event.target.value = "";
  };

  return (
    <div className={s.imageUploadBlock}>
      <div className={s.dropzone} onDrop={handleDrop} onDragOver={handleDragOver}>
        <input
          id="equipment-image"
          className={s.fileInput}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
        <label className={s.dropzoneLabel} htmlFor="equipment-image">
          <span className={s.dropzoneTitle}>Перетягніть зображення сюди</span>
          <span className={s.dropzoneHint}>або натисніть, щоб вибрати файл</span>
        </label>
      </div>

      {previewSrc && (
        <div className={s.previewBox}>
          <img className={s.previewImage} src={previewSrc} alt="Попередній перегляд обладнання" />
          <div className={s.previewMeta}>
            <span className={s.previewName}>{fileName}</span>
            <button type="button" className={s.clearImageButton} onClick={onClear}>
              Видалити зображення
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
