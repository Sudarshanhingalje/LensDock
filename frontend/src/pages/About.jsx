import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageHero, Reveal } from "../components/PageHero";
import g1 from "@/assets/gallery-1.jpg";
import g3 from "@/assets/gallery-3.png";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            One photographer. <span className="text-glow">One camera. One shop.</span>
          </>
        }
        subtitle="LensDock began as a notebook entry: rent out the body when I'm not shooting, sell the frames I love. Nothing more, nothing less."
      />

      <section ref={ref} className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            style={{ y: y1 }}
            className="overflow-hidden rounded-3xl border border-border"
          >
            <img
              src={g3}
              alt="Portrait study - Indian woman in green saree"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The studio
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Built in Kolhapur, for shooters who think in frames.
            </h2>
            <p className="mt-6 text-muted-foreground">
              No middlemen, no commissions taken from your work. The 80D sits on a shelf between
              shoots — you might as well use it. The shop holds personal work shot across India:
              landscapes, portraits, the in-between.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-32 grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div className="md:order-2">
            <motion.div
              style={{ y: y2 }}
              className="overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={g1}
                alt="Photographer at Work"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The promise
            </div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Verified gear, fair pricing, fast support.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Every handover is documented with before/after photos and an AI condition check. Your
              deposit is held — never spent — until the camera comes home.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {[
              ["120+", "Rentals fulfilled"],
              ["94%", "Return on time"],
              ["1.4k", "Frames licensed"],
              ["4.9★", "Customer rating"],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.08} className="bg-card p-8 text-center">
                <div className="text-4xl font-semibold tracking-tight text-glow md:text-5xl">
                  {n}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {l}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
