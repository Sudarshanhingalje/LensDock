import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicLoader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.random() * 18 + 6);
      setPct(Math.floor(n));
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="absolute inset-x-0 top-8 mx-auto flex max-w-7xl items-center justify-between px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>LensDock · 001</span>
            <span>Kolhapur / IN</span>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-7xl font-semibold tracking-tight tabular-nums sm:text-8xl"
            >
              {String(pct).padStart(3, "0")}
            </motion.div>
            <div className="mt-6 h-px w-64 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${pct}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Loading frame
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
