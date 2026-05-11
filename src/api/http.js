const BASE_URL = "";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export const getEquipment = () => apiFetch("/equipment");
export const getEquipmentById = (id) => apiFetch(`/equipment/${id}`);
export const createEquipment = (payload) =>
  apiFetch("/equipment", { method: "POST", body: JSON.stringify(payload) });

export const getUserByEmail = (email) =>
  apiFetch(`/users?email=${encodeURIComponent(email)}`);
export const createUser = (userData) =>
  apiFetch("/users", { method: "POST", body: JSON.stringify(userData) });

export const getBorrows = () => apiFetch("/borrows");
export const getBorrowsByEmail = (email) =>
  apiFetch(`/borrows?email=${encodeURIComponent(email)}`);
export const createBorrow = (borrowData) =>
  apiFetch("/borrows", { method: "POST", body: JSON.stringify(borrowData) });
export const deleteBorrow = (id) =>
  apiFetch(`/borrows/${id}`, { method: "DELETE" });
export const updateBorrowItems = (id, items) =>
  apiFetch(`/borrows/${id}`, { method: "PATCH", body: JSON.stringify({ items }) });
