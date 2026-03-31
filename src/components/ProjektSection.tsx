'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "5", label: "Wohneinheiten" },
  { number: "465 m²", label: "Wohnfläche" },
  { number: "4", label: "Geschosse" },
  { number: "9", label: "Stellplätze" },
];

const RevealWrap = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const ProjektSection = () => {
  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]" id="projekt">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <RevealWrap>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
                Das Projekt
              </p>
            </RevealWrap>
            <RevealWrap delay={0.1}>
              <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6">
                Exklusives Wohnen{" "}
                <br />
                im Neubaugebiet 24Morgenäcker
              </h2>
            </RevealWrap>
            <RevealWrap delay={0.2}>
              <p className="text-base text-muted-foreground leading-[1.8] mb-6">
                Im Neubaugebiet 24Morgenäcker in Stutensee-Spöck entsteht ein modernes Mehrfamilienhaus mit fünf exklusiven
                Eigentumswohnungen. Die teilweise altersgerecht konzipierten, lichtdurchfluteten 3-Zimmer-Wohnungen
                variieren zwischen 79&nbsp;m² und 134&nbsp;m² und bieten durch ihre hochwertige Ausstattung komfortables
                Wohnen für jedes Alter. Ideal für alle, die eine Wohnung in Stutensee kaufen möchten.
              </p>
            </RevealWrap>
            <RevealWrap delay={0.3}>
              <p className="text-base text-muted-foreground leading-[1.8]">
                Das Projekt steht für hochwertigen, modernen und zukunftsorientierten
                Wohnraum in einer der gefragtesten Wohnlagen im Raum Karlsruhe. Nur wenige Kilometer von Bruchsal entfernt verbindet der Standort die Ruhe einer grünen Umgebung mit hervorragender Anbindung.
              </p>
            </RevealWrap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjektSection;
