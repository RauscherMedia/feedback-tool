'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send } from "lucide-react";

const CtaBanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)] bg-primary">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[650px] mx-auto"
        >
          <h2 className="font-heading text-[clamp(1.5rem,1.2rem+1.5vw,2.2rem)] font-medium text-primary-foreground mb-4">
            Jetzt vormerken lassen!
          </h2>
          <p className="text-base text-primary-foreground/60 leading-relaxed mb-10">
            Vereinbaren Sie einen persönlichen Beratungstermin und erfahren Sie alle Details zu Ihrem neuen Zuhause.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollTo("#kontakt")}
              className="px-7 py-3.5 text-sm font-medium rounded-md bg-primary-foreground text-primary hover:bg-bg-alt transition-all shadow-md inline-flex items-center gap-2"
            >
              <Send size={16} /> Kontakt aufnehmen
            </button>
            <button
              onClick={() => scrollTo("#wohnungen")}
              className="px-7 py-3.5 text-sm font-medium rounded-md border-[1.5px] border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Wohnungen ansehen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
