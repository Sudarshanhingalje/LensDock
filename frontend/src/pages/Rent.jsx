import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ShieldCheck, Battery, Zap, Loader2, Upload, Phone, CheckCircle, X, Lock, AlertCircle, Info } from "lucide-react";
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

  // Consent Checkboxes for Aadhaar ID Verification
  const [consents, setConsents] = useState({
    belongsToMe: false,
    useConsent: false,
    noShare: false,
    autoDelete: false,
    terms: false,
    privacy: false,
  });

  const allConsentsChecked = Object.values(consents).every(Boolean);

  const handleCheckboxChange = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

    // Allowed file formats check (JPG, JPEG, PNG)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
      return;
    }

    // Maximum file size check (1 MB)
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File exceeds 1 MB limit. Please compress or crop the image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setIdPreview(reader.result);
      toast.success("Aadhaar ID image selected successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) { toast.error("Name and phone are required."); return; }
    if (!idPreview)                         { toast.error("Please upload your Aadhaar / ID card."); return; }
    if (!allConsentsChecked)                { toast.error("Please agree to all legal consents and privacy policies."); return; }
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
      // Reset consents
      setConsents({
        belongsToMe: false,
        useConsent: false,
        noShare: false,
        autoDelete: false,
        terms: false,
        privacy: false,
      });
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl rounded-3xl border border-primary/20 bg-card p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button onClick={() => setShowCheckout(false)}
                className="absolute right-5 top-5 rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition"
              ><X className="h-5 w-5" /></button>

              {/* Title & Trust Header */}
              <div className="mb-6 flex items-start gap-3 border-b border-border pb-4">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground tracking-tight flex items-center gap-2">
                    Complete Identity Verification
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    LensDock implements strict privacy-focused data verification. Your uploaded ID is encrypted and automatically deleted after your camera return.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                
                {/* ── Left Column: Form & Consents ── */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">1. Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name *</label>
                        <input id="rent-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/20 transition"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone / WhatsApp *</label>
                          <input id="rent-phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/20 transition"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-muted-foreground">Email (optional)</label>
                          <input id="rent-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 ring-primary/20 transition"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ID Upload Box */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">2. Upload ID Proof</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Please upload **ONE image** containing both the Front and Back of your Aadhaar card.
                    </p>
                    
                    {!idPreview ? (
                      <label className="flex flex-col items-center justify-center cursor-pointer rounded-2xl border border-dashed border-primary/20 hover:border-primary/50 bg-primary/[0.02] hover:bg-primary/[0.05] p-6 text-center transition">
                        <Upload className="h-8 w-8 text-primary mb-2" />
                        <span className="text-sm font-medium text-foreground">Click to upload image</span>
                        <span className="text-xs text-muted-foreground mt-1">Accepted formats: JPG, JPEG, PNG (Max 1 MB)</span>
                        <input type="file" accept="image/jpeg,image/jpg,image/png" className="sr-only" onChange={handleIdUpload} />
                      </label>
                    ) : (
                      <div className="relative rounded-2xl border border-border bg-card/40 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img src={idPreview} alt="Aadhaar Upload Preview" className="h-14 w-14 rounded-lg object-cover border border-border" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-foreground truncate">Aadhaar_ID_Uploaded.png</p>
                            <p className="text-[10px] text-green-400 font-medium">Image size and type verified ✓</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIdPreview(null)}
                          className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 6 Required Consent Checkboxes */}
                  <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-4 space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="h-4 w-4" /> Legal Consents & Privacy Policy
                    </h4>
                    
                    <div className="space-y-2.5">
                      {[
                        { key: "belongsToMe", text: "I confirm that the uploaded ID proof belongs to me." },
                        { key: "useConsent", text: "I consent to LensDock using my ID proof only for identity verification and rental security purposes." },
                        { key: "noShare", text: "I understand that my ID proof will not be shared with third parties except when required by law." },
                        { key: "autoDelete", text: "I understand that my ID proof will be securely deleted after the rental process is completed and the retention period ends." },
                        { key: "terms", text: "I agree to the Terms & Conditions." },
                        { key: "privacy", text: "I agree to the Privacy Policy." }
                      ].map((item) => (
                        <label key={item.key} className="flex items-start gap-3 cursor-pointer text-xs select-none">
                          <input
                            type="checkbox"
                            checked={consents[item.key]}
                            onChange={() => handleCheckboxChange(item.key)}
                            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-background"
                          />
                          <span className={consents[item.key] ? "text-foreground transition-colors" : "text-muted-foreground transition-colors"}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Right Column: Guidelines & reference ── */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Reference Image Container */}
                  <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-3">
                      <Info className="h-4 w-4" /> Required Upload Format
                    </h4>
                    
                    <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 p-1">
                      <img 
                        src="/aadhaar-reference.jpg" 
                        alt="Aadhaar Single Page Print Format" 
                        className="mx-auto aspect-[4/3] w-full object-contain rounded-lg bg-zinc-900" 
                      />
                    </div>
                    
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">
                      Place both FRONT and BACK aligned top-to-bottom on a single sheet.
                    </p>
                  </div>

                  {/* ID Quality Guidelines */}
                  <div className="rounded-2xl border border-border bg-card/40 p-4 space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" /> Image Quality Rules
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1.5 pl-1">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        Image must be clear, sharp, and highly readable.
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        No motion blur, camera shake, or heavy glare/reflections.
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        All four corners of the document must be fully visible (no cropped edges).
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        Both front side and back side must be clearly visible.
                      </li>
                    </ul>
                  </div>

                  {/* Price & Submit Action */}
                  <div className="pt-2">
                    <div className="rounded-2xl border border-border bg-card/50 p-4 mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Rental Fee ({days} Day{days !== 1 ? "s" : ""})</span>
                        <span>₹{rentalFee.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Refundable Deposit</span>
                        <span>₹{settings.depositAmount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border flex justify-between text-sm font-semibold">
                        <span>Total Payable</span>
                        <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !idPreview || !allConsentsChecked}
                      className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold shadow-lg hover:shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" /> Book Now
                        </>
                      )}
                    </button>
                    
                    {!allConsentsChecked && (
                      <p className="mt-2 text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3 text-muted-foreground shrink-0" /> Check all consents above to enable booking
                      </p>
                    )}
                  </div>
                </div>
                
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
