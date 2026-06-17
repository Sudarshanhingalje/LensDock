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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Scroll to top and refresh layout heights when route changes
  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      // 1. Temporarily detach the ScrollTrigger update listener to prevent crashes during React DOM updates
      lenis.off("scroll", ScrollTrigger.update);

      // 2. Perform the immediate scroll to top
      try {
        lenis.scrollTo(0, { immediate: true });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // 3. Clear any potential stuck styles on html and body (common with pinned ScrollTriggers)
    try {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("height");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
    } catch (e) {}

    // 4. After the DOM has settled, re-attach ScrollTrigger listener and refresh ScrollTrigger
    const timer = setTimeout(() => {
      try {
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
        }
        ScrollTrigger.refresh();
      } catch (e) {
        console.warn("ScrollTrigger refresh failed:", e);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, [location.pathname]);

  return <>{children}</>;
}
