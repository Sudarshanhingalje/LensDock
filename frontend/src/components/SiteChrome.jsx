import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: "Rent", to: "/rent" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6"
    >
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-border bg-background/60 px-5 py-3 backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight" onClick={() => setIsOpen(false)}>
          <img src="/logo.svg" className="h-7 w-7 object-contain" alt="LensDock Logo" />
          LensDock
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Admin Link (Desktop) / Hamburger Menu (Mobile) */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="hidden md:inline-flex btn-glow rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Admin
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground md:hidden hover:border-primary/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 right-4 top-20 z-40 rounded-3xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-3xl md:hidden"
          >
            <nav className="flex flex-col gap-4 text-center">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl py-3 text-base font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <hr className="border-border my-2" />
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="btn-glow flex items-center justify-center rounded-xl bg-primary py-3 text-base font-semibold text-primary-foreground"
              >
                Admin Panel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <img src="/logo.svg" className="h-7 w-7 object-contain" alt="LensDock Logo" />
              LensDock
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Camera rentals and fine-art photo licensing — built for the
              shooters of Kolhapur and beyond.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Platform
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/rent" className="hover:text-primary text-muted-foreground">Rent gear</Link></li>
              <li><Link to="/shop" className="hover:text-primary text-muted-foreground">Photo shop</Link></li>
              <li><Link to="/admin" className="hover:text-primary text-muted-foreground">My account</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary text-muted-foreground">About</Link></li>
              <li><a href="mailto:lensdock.team@gmail.com" className="hover:text-primary text-muted-foreground">Contact</a></li>
              <li><Link to="/admin" className="hover:text-primary text-muted-foreground">Studio</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} LensDock · Kolhapur, India</div>
          <div>Crafted in the dark room.</div>
        </div>
      </div>
    </footer>
  );
}
