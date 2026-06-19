import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const links = [
    { label: "Rent",  to: "/rent"  },
    { label: "Shop",  to: "/shop"  },
    { label: "About", to: "/about" },
    { label: "Poses", to: "/poses" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6"
    >
      <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur-2xl sm:mt-4 sm:px-5 sm:py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-sm sm:text-base"
        >
          <img src="/logo.svg" className="h-6 w-6 object-contain sm:h-7 sm:w-7" alt="LensDock Logo" />
          LensDock
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex lg:gap-8">
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

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/admin"
            className="hidden md:inline-flex btn-glow rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Admin
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-foreground md:hidden hover:border-primary/50 active:scale-95 transition-all"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-3 right-3 top-[68px] z-40 rounded-3xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-3xl md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <hr className="my-2 border-border" />
                <Link
                  to="/admin"
                  className="btn-glow flex items-center justify-center rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground"
                >
                  Admin Panel
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
          <div className="sm:col-span-2">
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
              <li><Link to="/rent"  className="hover:text-primary text-muted-foreground">Rent gear</Link></li>
              <li><Link to="/shop"  className="hover:text-primary text-muted-foreground">Photo shop</Link></li>
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
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:mt-12">
          <div>© {new Date().getFullYear()} LensDock · Kolhapur, India</div>
          <div>Crafted in the dark room.</div>
        </div>
      </div>
    </footer>
  );
}
