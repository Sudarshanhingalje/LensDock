import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ShieldCheck, Battery, Zap, Loader2, Upload, Phone, CheckCircle, X } from "lucide-react";
import { PageHero, Reveal } from "../components/PageHero";
import { getPublicSettings, submitBooking } from "../lib/api";
import { toast } from "sonner";

// ─── Static data ──────────────────────────────────────────────────────────────

const SPECS = [
  { label: "Sensor",    value: "24.2MP APS-C CMOS" },
  { label: "ISO",       value: "100 – 25,600"       },
  { label: "Video",     value: "1080p / 60fps"      },
  { label: "AF Points", value: "45 cross-type"      },
  { label: "Burst",     value: "7 fps"              },
  { label: "Weight",    value: "730g body"           },
];

const INCLUDED = [
  { icon: Camera,      t: "Canon 80D body"       },
  { icon: Zap,         t: "18-55mm kit lens"     },
  { icon: Battery,     t: "2× batteries + charger" },
  { icon: ShieldCheck, t: "Carry case & strap"   },
];

// ─── Calendar ────────────────────────────────────────────────────────────────

function Calendar({ value, onChange }) {
  const today = new Date();
  const month = today.getMonth();
  const year  = today.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const days      = new Date(year, month + 1, 0).getDate();

  const handle = (d) => {
    if (!value.start || (value.start && value.end)) {
      onChange({ start: d, end: null });
    } else if (d < value.start) {
      onChange({ start: d, end: value.start });
    } else {
      onChange({ ...value, end: d });
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-medium">
          {today.toLocaleString("en", { month: "long" })} {year}
        </div>
        <div className="text-xs text-muted-foreground">Tap start, then end date</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="py-2 font-medium">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          const isStart = d === value.start;
          const isEnd   = d === value.end;
          const inRange = value.start && value.end && d > value.start && d < value.end;
          const past    = d < today.getDate();
          return (
            <button key={d} disabled={past} onClick={() => handle(d)}
              className={`aspect-square rounded-md text-sm transition-colors
                ${isStart || isEnd ? "bg-primary text-primary-foreground font-semibold" : ""}
                ${inRange ? "bg-primary/20 text-foreground" : ""}
                ${past ? "cursor-not-allowed text-muted-foreground/30 line-through" : "hover:bg-muted"}
              `}
            >{d}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Rent() {
  const [range, setRange]               = useState({ start: null, end: null });
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [idPreview, setIdPreview] = useState(null);

  // Settings from backend (hardcoded defaults shown immediately, overridden by API)
  const [settings, setSettings] = useState({
    pricePerDay: 600,
    depositAmount: 1000,
    upiId: "sudarshanhingalje1@okaxis",
    qrCodeImage: "/QRpayment.jpeg",
    contactPhone: "+91 8308165273",
    address: "A/p nej tal hatkanagle dist kolhapur 416110",
  });

  useEffect(() => {
    getPublicSettings()
      .then(d => { if (d) setSettings(d); })
      .catch(() => {}); // silently fall back to defaults
  }, []);

  const days = useMemo(() => {
    if (range.start && range.end) return Math.max(1, range.end - range.start + 1);
    if (range.start) return 1;
    return 0;
  }, [range]);

  const rentalFee = days * settings.pricePerDay;
  const total     = rentalFee + settings.depositAmount;

  const handleIdUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Max file size is 5 MB."); return; }
    const reader = new FileReader();
    reader.onloadend = () => setIdPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) { toast.error("Name and phone are required."); return; }
    if (!idPreview)                         { toast.error("Please upload your Aadhaar / ID card."); return; }
    if (!range.start)                       { toast.error("Please select rental dates."); return; }

    const today = new Date();
    const pad   = (n) => String(n).padStart(2, "0");
    const fmt   = (d) =>
      `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(d)}`;

    const startDate = fmt(range.start);
    const endDate   = fmt(range.end ?? range.start);

    setSubmitting(true);
    try {
      await submitBooking({
        fullName, phone, email,
        startDate, endDate, days,
        totalAmount: rentalFee,
        aadhaarImage: idPreview,
      });
      setSubmitted(true);
      toast.success("Booking submitted! We'll confirm via WhatsApp.");
    } catch (err) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-2 ring-green-500/30">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold">Booking Submitted!</h1>
          <p className="mt-3 text-muted-foreground">
            Your request is under review. Sudarshan will confirm via WhatsApp or call on{" "}
            <span className="text-foreground font-medium">{settings.contactPhone || "+91 XXXXX XXXXX"}</span>.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Please complete payment of{" "}
            <span className="font-semibold text-primary">₹{total.toLocaleString("en-IN")}</span>{" "}
            via UPI to confirm your slot.
          </p>
          {settings.qrCodeImage && (
            <img src={settings.qrCodeImage} alt="Payment QR"
              className="mx-auto mt-6 h-48 w-48 rounded-2xl border border-border object-contain" />
          )}
          {settings.upiId && (
            <p className="mt-3 font-mono text-sm text-primary">{settings.upiId}</p>
          )}
          <button onClick={() => { setSubmitted(false); setRange({ start: null, end: null }); setShowCheckout(false); }}
            className="btn-primary mt-8"
          >Book Another Date</button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Camera Rental"
        title={<>Rent the <span className="text-glow">Canon 80D</span></>}
        subtitle="Professional DSLR for 1–10 days. Includes lens, batteries & carry case. Pick-up from Kolhapur (A/p Nej, Tal. Hatkangle)."
      />

      <section className="px-4 pb-32 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* ── Left: Specs + Calendar ── */}
            <div className="space-y-8">
              {/* Spec grid */}
              <Reveal>
                <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                  <h2 className="mb-4 font-semibold">Camera Specs</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {SPECS.map(s => (
                      <div key={s.label} className="rounded-xl border border-border/60 bg-background/60 p-3">
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="mt-0.5 text-sm font-medium">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {INCLUDED.map(({ icon: Icon, t }) => (
                      <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="h-4 w-4 text-primary shrink-0" />{t}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Calendar */}
              <Reveal delay={0.1}>
                <Calendar value={range} onChange={setRange} />
              </Reveal>

              {/* Pricing summary */}
              {days > 0 && (
                <Reveal delay={0.15}>
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rental ({days} day{days !== 1 ? "s" : ""})</span>
                      <span>₹{rentalFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Refundable deposit</span>
                      <span>₹{settings.depositAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold">
                      <span>Total payable</span>
                      <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <button onClick={() => setShowCheckout(true)}
                      className="btn-primary mt-4 w-full"
                    >Proceed to Book →</button>
                  </div>
                </Reveal>
              )}
            </div>

            {/* ── Right: QR / Contact ── */}
            <div className="space-y-6">
              <Reveal>
                <div className="rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur">
                  <h2 className="mb-1 font-semibold">Payment QR Code</h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Pay after booking is confirmed by Sudarshan.
                  </p>
                  {settings.qrCodeImage ? (
                    <img src={settings.qrCodeImage} alt="UPI QR Code"
                      className="mx-auto h-52 w-52 rounded-2xl border border-border object-contain" />
                  ) : (
                    <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
                      QR code not set yet
                    </div>
                  )}
                  {settings.upiId && (
                    <p className="mt-3 font-mono text-sm text-primary">{settings.upiId}</p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Call / WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      {settings.contactPhone || "+91 8308165273"}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Pick-up Address */}
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                  <p className="text-sm font-medium mb-1">Pick-up Address</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.address || "A/p nej tal hatkanagle dist kolhapur 416110"}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Checkout Modal ── */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              <button onClick={() => setShowCheckout(false)}
                className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted transition"
              ><X className="h-4 w-4" /></button>

              <h2 className="text-xl font-semibold">Complete Your Booking</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {days} day{days !== 1 ? "s" : ""} · ₹{rentalFee.toLocaleString("en-IN")} + ₹{settings.depositAmount.toLocaleString("en-IN")} deposit
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Full Name *</label>
                  <input id="rent-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone / WhatsApp *</label>
                  <input id="rent-phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email (optional)</label>
                  <input id="rent-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/40 transition"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Aadhaar / PAN Card *</label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border p-4 hover:border-primary/60 transition">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {idPreview ? "ID uploaded ✓" : "Click to upload (max 5 MB)"}
                    </span>
                    <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={handleIdUpload} />
                  </label>
                  {idPreview && idPreview.startsWith("data:image") && (
                    <img src={idPreview} alt="ID Preview" className="mt-2 h-24 rounded-xl border border-border object-cover" />
                  )}
                </div>

                <button type="submit" disabled={submitting}
                  className="btn-primary flex w-full items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  {submitting ? "Submitting…" : "Confirm Booking Request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
