import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { api } from "../lib/api";

export default function Shop() {
  const [photos, setPhotos] = useState([]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/photos")
      .then(data => {
        setPhotos(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch photos:", err);
        setLoading(false);
      });
  }, []);

  const cats = ["All", ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))];
  const filtered = photos.filter(
    (p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHero
        eyebrow="02 — Shop"
        title={<>Frames you can <span className="text-glow">actually use.</span></>}
        subtitle="Original photography, licensed for blog, social, and commercial use. Pay once, download instantly."
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-20 z-30 mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-background/80 p-3 backdrop-blur-xl sm:top-24 sm:mb-10 sm:gap-4 sm:p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    cat === c
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search frames"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground md:w-56 text-foreground"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center items-center text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" /> Loading catalog...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No photos found.</div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                  className="mb-4 break-inside-avoid"
                >
                  <Link
                    to={`/shop/${p.id}`}
                    className="group relative block overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <img
                      src={p.previewUrl}
                      alt={p.title}
                      loading="lazy"
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                      style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="text-[10px] uppercase tracking-widest text-primary">{p.category}</div>
                      <div className="mt-1 flex items-end justify-between gap-3">
                        <div className="text-lg font-medium text-foreground">{p.title}</div>
                        <div className="text-sm text-muted-foreground">from ₹{p.blogPrice}</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
