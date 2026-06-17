import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Download, Eye, Loader2 } from "lucide-react";
import { Reveal } from "../components/PageHero";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function ShopItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [lic, setLic] = useState("social");
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    api.get(`/photos/${id}`)
      .then(data => {
        setPhoto(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load photo details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  if (!photo) return (
    <div className="px-6 pt-40 pb-40 text-center">
      <h1 className="text-3xl font-semibold">Frame not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary">Back to shop</Link>
    </div>
  );

  const licenses = [
    { id: "blog", name: "Blog", price: photo.blogPrice, desc: "Editorial, articles, newsletters", incl: ["Up to 1080p", "Credit required", "Single domain"] },
    { id: "social", name: "Social", price: photo.socialPrice, desc: "Instagram, X, TikTok, LinkedIn", incl: ["Full resolution", "No credit needed", "All social platforms"] },
    { id: "commercial", name: "Commercial", price: photo.commercialPrice, desc: "Ads, packaging, paid campaigns", incl: ["Print-grade RAW", "Worldwide license", "Perpetual rights"] },
  ];
  const current = licenses.find((l) => l.id === lic);

  const purchase = async () => {
    setBuying(true);
    try {
      await api.post("/licenses", {
        photoId: photo.id,
        tier: lic,
        amount: current.price
      });
      toast.success("License granted! Check your dashboard.");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to license photo: " + err.message);
    } finally {
      setBuying(false);
    }
  };

  return (
    <section className="px-6 pt-32 pb-32">
      <div className="mx-auto max-w-7xl">
        <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img src={photo.previewUrl} alt={photo.title} className="w-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="sticky top-28">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">{photo.category}</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{photo.title}</h1>
              <p className="mt-4 text-muted-foreground">{photo.description ?? "Original frame, ready to license."}</p>

              <div className="mt-6 flex gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Preview</div>
                <div className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> Instant delivery</div>
              </div>

              <div className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">Choose a license</div>
              <div className="mt-3 space-y-2">
                {licenses.map((l) => {
                  const active = l.id === lic;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLic(l.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                        active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{l.name}</div>
                          <div className="text-xs text-muted-foreground">{l.desc}</div>
                        </div>
                        <div className="text-xl font-semibold text-foreground">₹{l.price}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {current.incl.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={purchase}
                disabled={buying}
                className="btn-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {buying ? <Loader2 className="h-4 w-4 animate-spin" /> : `License for ₹${current.price}`}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
