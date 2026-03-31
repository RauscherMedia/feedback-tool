'use client';

import Link from "next/link";

const SiteFooter = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-bg-dark text-primary-foreground/60 pt-16">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16 pb-16 border-b border-primary-foreground/10">
        <div>
          <a href="#" className="block mb-4">
            <img src="/glp-logo-light.png" alt="GLP" className="h-12 w-auto" />
          </a>
          <p className="text-sm leading-relaxed max-w-[280px]">
            Innovative Ideen. Kreativ, zuverlässig und nachhaltig umgesetzt.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Navigation</h4>
          {["projekt", "lage", "wohnungen", "ausstattung", "faq"].map((id) => (
            <button key={id} onClick={() => scrollTo(`#${id}`)} className="block text-sm text-primary-foreground/50 hover:text-accent-light py-1 transition-colors capitalize">
              {id === "faq" ? "FAQ" : id}
            </button>
          ))}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Rechtliches</h4>
          <Link href="/impressum" className="block text-sm text-primary-foreground/50 hover:text-accent-light py-1 transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="block text-sm text-primary-foreground/50 hover:text-accent-light py-1 transition-colors">Datenschutz</Link>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary-foreground mb-4">Kontakt</h4>
          <a href="https://www.glp-designbau.de" target="_blank" rel="noopener" className="block text-sm text-primary-foreground/50 hover:text-accent-light py-1 transition-colors">
            www.glp-designbau.de
          </a>
          <button onClick={() => scrollTo("#kontakt")} className="block text-sm text-primary-foreground/50 hover:text-accent-light py-1 transition-colors">
            Kontaktformular
          </button>
        </div>
      </div>
      <div className="container py-6 flex flex-col sm:flex-row justify-between text-xs text-primary-foreground/35 gap-1">
        <p>© 2025 glp designbau GmbH. Alle Rechte vorbehalten.</p>
        <p>Geschäftsführer: Dennis Geißler & Nicole LaCroix</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
