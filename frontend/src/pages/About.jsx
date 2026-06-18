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

      <section ref={ref} className="px-4 py-16 sm:px-6 sm:py-24">
        {/* Section 1 */}
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <motion.div
            style={{ y: y1 }}
            className="overflow-hidden rounded-2xl border border-border sm:rounded-3xl"
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Built in Kolhapur, for shooters who think in frames.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground sm:text-base">
              No middlemen, no commissions taken from your work. The 80D sits on a shelf between
              shoots — you might as well use it. The shop holds personal work shot across India:
              landscapes, portraits, the in-between.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-10 md:mt-32 md:grid-cols-2 md:items-center md:gap-12">
          <div className="md:order-2">
            <motion.div
              style={{ y: y2 }}
              className="overflow-hidden rounded-2xl border border-border sm:rounded-3xl"
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Verified gear, fair pricing, fast support.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground sm:text-base">
              Every handover is documented with before/after photos and an AI condition check. Your
              deposit is held — never spent — until the camera comes home.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:rounded-3xl md:grid-cols-4">
            {[
              ["120+", "Rentals fulfilled"],
              ["94%",  "Return on time"  ],
              ["1.4k", "Frames licensed" ],
              ["4.9★", "Customer rating" ],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.08} className="bg-card p-6 text-center sm:p-8">
                <div className="text-3xl font-semibold tracking-tight text-glow sm:text-4xl md:text-5xl">
                  {n}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
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
