export function resolveEquipmentImageSrc(equipment) {
  if (!equipment) return "";

  if (equipment.imageData) return equipment.imageData;
  if (equipment.imageUrl) return equipment.imageUrl;

  const image = equipment.image;
  if (!image) return "";
  if (/^(data:|https?:\/\/|\/)/.test(image)) return image;

  return `/equipment-images/${image}`;
}
