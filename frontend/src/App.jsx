import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { SiteNav, SiteFooter } from "./components/SiteChrome";
import { CinematicLoader } from "./components/CinematicLoader";
import { SmoothScroll } from "./components/SmoothScroll";

// Pages
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Shop from "./pages/Shop";
import ShopItem from "./pages/ShopItem";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-foreground antialiased font-sans">
          {/* Global UI Components */}
          <CinematicLoader />
          <Toaster position="top-right" theme="dark" closeButton />
          
          <SiteNav />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ShopItem />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <SiteFooter />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
