import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, IndianRupee, Camera, Users, LogOut,
  KeyRound, Loader2, ShieldCheck, CheckCircle,
  Eye, Settings, ListOrdered, Trash2, RefreshCw,
  Package, QrCode, PhoneCall, X, Mail
} from "lucide-react";
import {
  login as apiLogin,
  saveToken, clearToken, isLoggedIn,
  getAdminBookings, updateBookingStatus, deleteBooking,
  getDashboardStats, getAdminSettings, updateSettings
} from "../lib/api";
import { toast } from "sonner";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  PENDING:  "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  APPROVED: "text-green-400  bg-green-400/10  border-green-400/30",
  REJECTED: "text-red-400    bg-red-400/10    border-red-400/30",
  RETURNED: "text-blue-400   bg-blue-400/10   border-blue-400/30",
};

function Badge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[status] || "text-muted-foreground bg-muted border-border"}`}>
      {status}
    </span>
  );
}

// ─── Email badges ─────────────────────────────────────────────────────────────

function EmailBadge({ booking }) {
  if (!booking.email) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/40 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500" title="No customer email provided">
        <Mail className="h-3 w-3" /> No Email
      </span>
    );
  }

  if (booking.emailSent) {
    const sentTime = booking.emailSentAt 
      ? new Date(booking.emailSentAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit"
        })
      : "Yes";
    return (
      <span 
        className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 cursor-help"
        title={`Sent successfully: ${sentTime}`}
      >
        <Mail className="h-3 w-3 text-emerald-400" /> Sent
      </span>
    );
  }

  const needsEmail = ["APPROVED", "REJECTED", "RETURNED"].includes(booking.status);
  return (
    <span 
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium cursor-help ${
        needsEmail 
          ? "border-amber-500/30 bg-amber-500/10 text-amber-400" 
          : "border-zinc-700 bg-zinc-800/20 text-zinc-500"
      }`}
      title={needsEmail ? "Email pending/failed" : "No auto-email for Pending status"}
    >
      <Mail className="h-3 w-3" /> {needsEmail ? "Pending" : "Not Sent"}
    </span>
  );
}

function EmailIconIndicator({ booking }) {
  if (!booking.email) return null;
  if (booking.emailSent) {
    const sentTime = booking.emailSentAt 
      ? new Date(booking.emailSentAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit"
        })
      : "Yes";
    return (
      <span className="text-emerald-400 cursor-help flex items-center" title={`Email sent to ${booking.email} at ${sentTime}`}>
        <Mail className="h-3.5 w-3.5" />
      </span>
    );
  }
  const needsEmail = ["APPROVED", "REJECTED", "RETURNED"].includes(booking.status);
  return (
    <span 
      className={`cursor-help flex items-center ${needsEmail ? "text-amber-400 animate-pulse" : "text-zinc-600"}`} 
      title={needsEmail ? "Email pending/failed" : "Email not sent (Pending status)"}
    >
      <Mail className="h-3.5 w-3.5" />
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color = "text-primary" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
    >
      <div className="mb-3">
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </motion.div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLogin(username, password);
      saveToken(res.token);
      onLogin();
      toast.success("Welcome back, Sudarshan.");
    } catch (err) {
      toast.error(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Camera className="h-4 w-4 text-primary" /> LensDock · Admin Studio
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, <span className="text-glow">Sudarshan.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your Kolhapur camera rental studio.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Username</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="admin-username" type="text" value={username} required
                  autoComplete="username" onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="admin-password" type="password" value={password} required
                  autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="btn-primary mt-6 flex w-full items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            {loading ? "Authenticating…" : "Sign In"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────

function BookingsTab({ bookings, onStatusChange, onDelete, loading }) {
  const [filter, setFilter] = useState("ALL");
  const [lightbox, setLightbox] = useState(null);

  const filters = ["ALL", "PENDING", "APPROVED", "REJECTED", "RETURNED"];
  const visible = filter === "ALL" ? bookings : bookings.filter(b => b.status === filter);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1 text-xs font-medium transition ${filter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >{f}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {visible.map(b => (
            <motion.div key={b.id} layout
              className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{b.fullName}</p>
                  <p className="text-sm text-muted-foreground">{b.phone} {b.email ? `· ${b.email}` : ""}</p>
                  <p className="mt-1 text-sm">
                    {b.startDate} → {b.endDate}
                    <span className="ml-2 text-muted-foreground">({b.days} day{b.days !== 1 ? "s" : ""})</span>
                  </p>
                  <p className="mt-1 font-medium text-primary">₹{b.totalAmount?.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <Badge status={b.status} />
                  <EmailBadge booking={b} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {b.aadhaarImage && (
                  <button onClick={() => setLightbox(b.aadhaarImage)}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:border-primary/60 transition"
                  ><Eye className="h-3.5 w-3.5" /> View ID</button>
                )}
                {["PENDING","APPROVED","REJECTED","RETURNED"].map(s => {
                  if (s === b.status) return null;
                  const buttonColors = {
                    PENDING:  "text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-400",
                    APPROVED: "text-green-400 border-green-500/30 hover:bg-green-500/10 hover:border-green-400",
                    REJECTED: "text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-400",
                    RETURNED: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-400",
                  };
                  const label = s === "APPROVED" ? "Approve" : s === "REJECTED" ? "Reject" : s === "RETURNED" ? "Return" : "Pending";
                  return (
                    <button 
                      key={s} 
                      onClick={() => onStatusChange(b.id, s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition capitalize ${buttonColors[s] || "border-border text-muted-foreground hover:border-primary/60"}`}
                    >
                      {label}
                    </button>
                  );
                })}
                <button onClick={() => onDelete(b.id)}
                  className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition"
                ><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Aadhaar Lightbox */}
      <AnimatePresence>
        {lightbox && (() => {
          const isPdf = lightbox.startsWith("data:application/pdf") || (!lightbox.startsWith("data:") && lightbox.startsWith("JVBER"));
          const srcUrl = lightbox.startsWith("data:") ? lightbox : `data:${isPdf ? "application/pdf" : "image/jpeg"};base64,${lightbox}`;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
              onClick={() => setLightbox(null)}
            >
              <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                <button onClick={() => setLightbox(null)}
                  className="absolute -top-4 -right-4 z-10 rounded-full bg-card border border-border p-1.5 hover:bg-muted transition"
                ><X className="h-4 w-4" /></button>
                {isPdf ? (
                  <div className="flex flex-col gap-3 w-full bg-card p-4 rounded-2xl border border-border">
                    <p className="text-sm font-medium">Aadhaar / ID Card (PDF)</p>
                    <iframe src={srcUrl} className="w-full h-[70vh] rounded-xl border border-border bg-white" title="ID PDF Document" />
                    <a href={srcUrl} download="Aadhaar_ID.pdf" className="btn-primary py-2 text-center text-xs rounded-xl flex items-center justify-center gap-1.5">
                      Download PDF
                    </a>
                  </div>
                ) : (
                  <img src={srcUrl} alt="ID Document" className="w-full rounded-2xl border border-border max-h-[85vh] object-contain bg-zinc-950" />
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab({ settings, onChange, onSave }) {
  const fields = [
    { key: "pricePerDay",    label: "Price Per Day (₹)",   type: "number" },
    { key: "depositAmount",  label: "Deposit Amount (₹)",  type: "number" },
    { key: "upiId",          label: "UPI ID",              type: "text"   },
    { key: "contactPhone",   label: "Contact Phone",       type: "text"   },
    { key: "contactEmail",   label: "Contact Email",       type: "email"  },
    { key: "address",        label: "Studio Address",      type: "text"   },
  ];

  return (
    <form onSubmit={onSave} className="max-w-xl space-y-5">
      {fields.map(f => (
        <div key={f.key}>
          <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
          <input type={f.type} value={settings[f.key] ?? ""}
            onChange={e => onChange(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
          />
        </div>
      ))}

      <div>
        <label className="mb-1.5 block text-sm font-medium">QR Code Image</label>
        <p className="mb-2 text-xs text-muted-foreground">Upload a base64-encoded PNG of your payment QR code.</p>
        <input type="file" accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onChange("qrCodeImage", reader.result);
            reader.readAsDataURL(file);
          }}
          className="text-sm text-muted-foreground"
        />
        {settings.qrCodeImage && (
          <img src={settings.qrCodeImage} alt="QR Code Preview"
            className="mt-3 h-32 w-32 rounded-xl border border-border object-contain" />
        )}
      </div>

      <button type="submit" className="btn-primary flex items-center gap-2">
        <CheckCircle className="h-4 w-4" /> Save Settings
      </button>
    </form>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed]       = useState(isLoggedIn());
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings]   = useState([]);
  const [stats, setStats]         = useState({ totalBookings: 0, pendingBookings: 0, approvedBookings: 0, totalRevenue: 0 });
  const [settings, setSettings]   = useState({ pricePerDay: 500, depositAmount: 2000, upiId: "", contactPhone: "", contactEmail: "", address: "", qrCodeImage: "" });
  const [loading, setLoading]     = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [b, s, cfg] = await Promise.all([
        getAdminBookings(), getDashboardStats(), getAdminSettings()
      ]);
      setBookings(b || []);
      setStats(s || {});
      if (cfg) setSettings(cfg);
    } catch (err) {
      toast.error("Failed to load data: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
      toast.success(`Booking #${id} → ${status}`);
    } catch (err) { toast.error(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete booking #${id}?`)) return;
    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
      toast.success(`Booking #${id} deleted.`);
    } catch (err) { toast.error(err.message); }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateSettings(settings);
      if (updated) setSettings(updated);
      toast.success("Settings saved.");
    } catch (err) { toast.error(err.message); }
  };

  const handleLogout = () => { clearToken(); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs = [
    { id: "overview",  label: "Overview",  icon: TrendingUp  },
    { id: "bookings",  label: "Bookings",  icon: ListOrdered },
    { id: "settings",  label: "Settings",  icon: Settings    },
  ];

  return (
    <section className="relative min-h-screen px-4 pt-28 pb-20 md:px-8 lg:px-16">
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">LensDock · Kolhapur Camera Rental</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} disabled={loading}
              className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm hover:border-primary/60 transition"
            ><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
            ><LogOut className="h-4 w-4" /> Sign Out</button>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="mb-8 flex gap-1 rounded-2xl border border-border bg-card/40 p-1 w-fit backdrop-blur">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition-all ${activeTab === t.id ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── Overview ── */}
            {activeTab === "overview" && (
              <div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard icon={ListOrdered}  label="Total Bookings"   value={stats.totalBookings}   color="text-primary" />
                  <StatCard icon={Users}         label="Pending"          value={stats.pendingBookings}  color="text-yellow-400" />
                  <StatCard icon={CheckCircle}   label="Approved"         value={stats.approvedBookings} color="text-green-400" />
                  <StatCard icon={IndianRupee}   label="Total Revenue"    value={`₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`} color="text-emerald-400" />
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
                  <h2 className="mb-1 text-lg font-semibold">Recent Bookings</h2>
                  <p className="mb-4 text-sm text-muted-foreground">Latest 5 rental requests</p>
                  {loading ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                  ) : bookings.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">No bookings yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted-foreground">
                            <th className="pb-3 pr-4 font-medium">Name</th>
                            <th className="pb-3 pr-4 font-medium">Phone</th>
                            <th className="pb-3 pr-4 font-medium">Dates</th>
                            <th className="pb-3 pr-4 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {bookings.slice(0, 5).map(b => (
                            <tr key={b.id} className="hover:bg-muted/30 transition">
                              <td className="py-3 pr-4 font-medium">{b.fullName}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{b.phone}</td>
                              <td className="py-3 pr-4 text-muted-foreground">{b.startDate} → {b.endDate}</td>
                              <td className="py-3 pr-4 font-medium text-primary">₹{b.totalAmount?.toLocaleString("en-IN")}</td>
                              <td className="py-3">
                                <div className="flex items-center gap-2">
                                  <Badge status={b.status} />
                                  <EmailIconIndicator booking={b} />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Bookings ── */}
            {activeTab === "bookings" && (
              <BookingsTab
                bookings={bookings}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                loading={loading}
              />
            )}

            {/* ── Settings ── */}
            {activeTab === "settings" && (
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
                <h2 className="mb-1 text-lg font-semibold">Site Settings</h2>
                <p className="mb-6 text-sm text-muted-foreground">These values are stored in the database and used globally.</p>
                <SettingsTab
                  settings={settings}
                  onChange={(key, val) => setSettings(prev => ({ ...prev, [key]: val }))}
                  onSave={handleSaveSettings}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
