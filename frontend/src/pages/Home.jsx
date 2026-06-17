import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, ArrowUpRight, Sparkles, Check } from "lucide-react";

import heroCamera from "@/assets/hero-camera.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.png";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────────────────────────────────────────── STAGGER TEXT */
function StaggerWords({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────── HERO + STICKY SCALE */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />

        <motion.div
          style={{ y: titleY, opacity }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now serving Kolhapur photographers
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.div>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl md:text-[96px] md:leading-[0.92]">
            <StaggerWords text="Rent the camera." delay={1.7} />
            <br />
            <span className="text-glow">
              <StaggerWords text="Buy the shot." delay={2.0} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            A Canon 80D for your next shoot. A library of original photos for
            everything in between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/rent"
              className="btn-glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Rent the 80D
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Browse photos <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ scale, y }}
          className="absolute inset-x-0 bottom-[-10%] mx-auto h-[60vh] w-[90%] max-w-5xl overflow-hidden rounded-3xl border border-border shadow-2xl"
        >
          <img
            src={heroCamera}
            alt="Canon 80D"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          ↓ scroll
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────── VELOCITY MARQUEE */
function VelocityMarquee({ text }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * -0.5 * (delta / 1000) * 100;
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="overflow-hidden border-y border-border py-8">
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap text-6xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            {text}
            <span className="text-primary">●</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
function wrap(min, max, v) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

/* ──────────────────────────── PINNED HORIZONTAL GALLERY */
function HorizontalGallery() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const total = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const photos = [
    { src: g1, title: "Ridge / Golden hour", tag: "Landscape" },
    { src: g2, title: "Neon district", tag: "Street" },
    { src: g3, title: "Lumen study", tag: "Portrait" },
    { src: g4, title: "Concrete light", tag: "Architecture" },
    { src: g5, title: "Canopy fog", tag: "Aerial" },
  ];

  return (
    <section ref={wrapRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex h-screen items-center gap-8 pl-[10vw] pr-[10vw] will-change-transform">
        <div className="flex h-full w-[60vw] shrink-0 flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            01 — Featured shots
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            A library of light, <br />
            <span className="text-glow">licensed in seconds.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Scroll →  to flip through the gallery. Every frame is
            available for blog, social, or commercial use.
          </p>
        </div>

        {photos.map((p, i) => (
          <div
            key={i}
            className="group relative h-[72vh] w-[52vh] shrink-0 overflow-hidden rounded-2xl border border-border"
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs uppercase tracking-widest text-primary">
                {p.tag}
              </div>
              <div className="mt-1 text-xl font-medium">{p.title}</div>
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
              0{i + 1} / 0{photos.length}
            </div>
          </div>
        ))}

        <div className="flex h-full w-[40vw] shrink-0 items-center">
          <Link
            to="/shop"
            className="btn-glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Open full gallery <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PARALLAX FLOATING SHOWCASE */
function ParallaxShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section ref={ref} className="relative px-6 py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <div className="relative h-[80vh]">
          <motion.div
            style={{ y: y1, rotate: rot }}
            className="absolute left-0 top-0 h-64 w-48 overflow-hidden rounded-2xl border border-border shadow-2xl"
          >
            <img src={g3} alt="" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute right-4 top-20 h-80 w-64 overflow-hidden rounded-2xl border border-border shadow-2xl"
          >
            <img src={g4} alt="" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-0 left-12 h-72 w-56 overflow-hidden rounded-2xl border border-border shadow-2xl"
          >
            <img src={g2} alt="" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            02 — How it works
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Two flows. <br />
            <span className="text-glow">One clean checkout.</span>
          </h2>
          <ul className="mt-10 space-y-6">
            {[
              ["Pick dates", "Live calendar shows what's free. Confirm details instantly."],
              ["Guarantor Upload", "Simple ID submission for secure verification."],
              ["Shoot or download", "Use the physical gear, or license a photo and download in seconds."],
            ].map(([t, d], i) => (
              <li
                key={t}
                className="group flex items-start gap-5 border-t border-border pt-6"
              >
                <span className="text-sm text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <div className="text-xl font-medium">{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── PIN + SCALE REVEAL */
function PinReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1.15]);
  const round = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-60%"]);
  const textO = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: textO, y: textY }}
          className="absolute z-10 px-6 text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            03 — Made for the moment
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            Every frame, <br />
            <span className="text-glow">cinema-grade.</span>
          </h2>
        </motion.div>
        <motion.div
          style={{ scale, borderRadius: round }}
          className="relative h-[80vh] w-[60vw] overflow-hidden border border-border"
        >
          <img src={g1} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── PRICING */
function Pricing() {
  const tiers = [
    {
      name: "1 Day",
      price: "₹600",
      unit: "/day",
      notes: ["₹1,000 refundable deposit", "Local pickup / Kolhapur", "1 battery + charger included"],
    },
    {
      name: "Weekend (2 Days)",
      price: "₹1,100",
      unit: "/total",
      notes: ["₹1,000 refundable deposit", "Fri night → Sun night", "Extra battery + kit lens included"],
      featured: true,
    },
    {
      name: "Week (7 Days)",
      price: "₹3,500",
      unit: "/total",
      notes: ["₹1,500 refundable deposit", "Save ₹700 (Best value)", "Free Kolhapur delivery + carry case"],
    },
  ];
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center text-5xl font-semibold tracking-tight md:text-6xl"
        >
          Honest, flat pricing.
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`rounded-3xl border p-8 flex flex-col justify-between ${
                t.featured
                  ? "border-primary/60 bg-primary/5 btn-glow animate-pulse-subtle"
                  : "border-border bg-card"
              }`}
            >
              <div>
                <div className="text-sm text-muted-foreground">{t.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{t.unit}</span>
                </div>
                <ul className="mt-8 space-y-2.5 text-sm text-muted-foreground">
                  {t.notes.map((n) => (
                    <li key={n} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" /> <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/rent"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/95"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                Book this slot
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── CTA */
function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[180px]" />
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Ready to <span className="text-glow">roll the shutter?</span>
        </h2>
        <p className="mt-6 text-muted-foreground">
          Book your weekend with the 80D, or grab a frame from the shop.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/rent"
            className="btn-glow rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Rent the 80D
          </Link>
          <Link
            to="/shop"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold"
          >
            Browse photos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityMarquee text="Cinema 24mm · 50mm Prime · ISO 6400 · Frame 80D" />
      <HorizontalGallery />
      <ParallaxShowcase />
      <PinReveal />
      <Pricing />
      <CTA />
    </>
  );
}
