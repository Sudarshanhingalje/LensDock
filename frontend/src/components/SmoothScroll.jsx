import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();
  const rafRef = useRef(null);

  // Initialize Lenis once on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    rafRef.current = raf;
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // On every route change: kill old ScrollTriggers, scroll to top, refresh
  useEffect(() => {
    const lenis = lenisRef.current;

    // 1. Kill ALL existing ScrollTriggers — this releases any body overflow/position locks
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // 2. Force-clear any stuck inline styles on html/body that GSAP pin may have set
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    for (const prop of ["overflow", "height", "position", "top", "left", "width"]) {
      htmlEl.style.removeProperty(prop);
      bodyEl.style.removeProperty(prop);
    }

    // 3. Scroll to top immediately
    if (lenis) {
      try { lenis.scrollTo(0, { immediate: true }); } catch (_) {}
    }
    window.scrollTo(0, 0);

    // 4. Re-attach listener and refresh after DOM settles
    const timer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        console.warn("ScrollTrigger refresh failed:", e);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
}
