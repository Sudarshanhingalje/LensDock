// Central API client – all backend calls go through here.
// Base URL switches automatically between dev and production.

// In production (Vercel): /api/* is proxied server-side to the AWS backend via vercel.json rewrites.
// In local dev: Vite devServer proxy forwards /api/* to http://localhost:8080/api.
// Using a relative path avoids the HTTPS→HTTP mixed-content browser block entirely.
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// ─── Token helpers ───────────────────────────────────────────────────────────

export const saveToken = (token) => localStorage.setItem("ld_token", token);
export const getToken = () => localStorage.getItem("ld_token");
export const clearToken = () => localStorage.removeItem("ld_token");

export const isLoggedIn = () => !!getToken();

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export const login = (username, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

// ─── Public Settings (pricing, QR code) ──────────────────────────────────────

export const getPublicSettings = () => request("/settings/public");

// ─── Public Booking Submission ────────────────────────────────────────────────

export const submitBooking = (bookingData) =>
  request("/bookings", { method: "POST", body: JSON.stringify(bookingData) });

// ─── Admin: Bookings ──────────────────────────────────────────────────────────

export const getAdminBookings = (status) =>
  request(`/admin/bookings${status ? `?status=${status}` : ""}`);

export const updateBookingStatus = (id, status) =>
  request(`/admin/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const deleteBooking = (id) =>
  request(`/admin/bookings/${id}`, { method: "DELETE" });

// ─── Admin: Dashboard Stats ───────────────────────────────────────────────────

export const getDashboardStats = () => request("/admin/stats");

// ─── Admin: Gear ─────────────────────────────────────────────────────────────

export const getAdminGear = () => request("/admin/gear");
export const getPublicGear = () => request("/gear");

export const createGear = (item) =>
  request("/admin/gear", { method: "POST", body: JSON.stringify(item) });

export const updateGear = (id, item) =>
  request(`/admin/gear/${id}`, { method: "PUT", body: JSON.stringify(item) });

export const deleteGear = (id) =>
  request(`/admin/gear/${id}`, { method: "DELETE" });

// ─── Admin: Settings ─────────────────────────────────────────────────────────

export const getAdminSettings = () => request("/settings/admin");

export const updateSettings = (settings) =>
  request("/settings/admin", { method: "PUT", body: JSON.stringify(settings) });

// ─── Direct HTTP Client Object (used by Shop / ShopItem) ─────────────────────

export const api = {
  get: (path, options = {}) => request(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) =>
    request(path, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (path, body, options = {}) =>
    request(path, { ...options, method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body, options = {}) =>
    request(path, { ...options, method: "PATCH", body: JSON.stringify(body) }),
  delete: (path, options = {}) =>
    request(path, { ...options, method: "DELETE" }),
};
