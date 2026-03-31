'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#projekt", label: "Projekt" },
  { href: "#lage", label: "Lage" },
  { href: "#wohnungen", label: "Wohnungen" },
  { href: "#ausstattung", label: "Ausstattung" },
  { href: "#faq", label: "FAQ" },
  { href: "#unternehmen", label: "Über uns" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    const el = document.querySelector(href);
    if (el) {
      const offset = 72 + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    document.body.style.overflow = !menuOpen ? "hidden" : "";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-[72px] transition-all duration-400 ${
        scrolled
          ? "bg-background/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-[72px]">
        <a href="#" className="flex items-center z-10 -mt-[72px] pt-[72px] ml-[15px]">
          <img
            src="/glp-logo.png"
            alt="GLP designbau"
            className="h-[72px] w-auto object-contain object-top drop-shadow-[0_3px_12px_rgba(0,0,0,0.15)]"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`px-4 py-2 text-sm font-normal relative transition-colors group ${
                scrolled
                  ? "text-muted-foreground hover:text-primary"
                  : "text-primary-foreground/75 hover:text-primary-foreground"
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); scrollTo("#kontakt"); }}
            className={`ml-2 px-5 py-2 text-sm font-medium rounded-md transition-all ${
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            }`}
          >
            Kontakt
          </a>
        </nav>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 z-10"
          aria-label="Menü"
        >
          {menuOpen ? (
            <X className={scrolled && !menuOpen ? "text-primary" : "text-primary-foreground"} size={24} />
          ) : (
            <Menu className={scrolled ? "text-primary" : "text-primary-foreground"} size={24} />
          )}
        </button>

        {/* Mobile nav */}
        <div
          className={`fixed top-0 right-0 w-[min(380px,85vw)] h-screen bg-bg-dark/97 backdrop-blur-xl flex flex-col justify-center items-start px-10 gap-2 transition-transform duration-400 lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-lg text-primary-foreground/75 hover:text-primary-foreground py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); scrollTo("#kontakt"); }}
            className="mt-4 px-5 py-2 text-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground rounded-md hover:bg-primary-foreground/20 transition-all"
          >
            Kontakt
          </a>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
