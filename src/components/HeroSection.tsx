'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/sickingerhof.png)", y: bgY }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <motion.div className="container relative z-[2] py-32 max-w-[700px]" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="text-xs font-medium uppercase tracking-[0.2em] text-accent-light mb-6"
        >
          Neubau-Eigentumswohnungen · Stutensee-Spöck bei Bruchsal · 2025/2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
          className="font-heading text-[clamp(2.8rem,2rem+4vw,4.5rem)] font-medium leading-[1.1] text-primary-foreground mb-6"
        >
          Eigentumswohnungen{" "}
          <br />
          kaufen am Sickingerhof
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
          className="text-lg text-primary-foreground/70 leading-relaxed mb-10 max-w-[520px]"
        >
          5 exklusive Neubau-Wohnungen in Stutensee-Spöck. Von der altersgerechten 3-Zimmer-Wohnung bis zum Penthouse.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.85 }}
          className="flex gap-4 flex-wrap"
        >
          <button
            onClick={() => scrollTo("#wohnungen")}
            className="px-7 py-3.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
          >
            Wohnungen entdecken
          </button>
          <button
            onClick={() => scrollTo("#kontakt")}
            className="px-7 py-3.5 text-sm font-medium rounded-md border-[1.5px] border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all"
          >
            Kontakt aufnehmen
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-[clamp(1.5rem,2vw,3rem)] z-[2] flex flex-col items-center gap-2">
        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-primary-foreground/40 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-[60px] bg-primary-foreground/20 relative overflow-hidden">
          <div className="absolute left-0 w-full h-full bg-accent-light animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
