'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, KeyRound, Calendar, MapPin, Ruler, Box } from "lucide-react";

const data = [
  { icon: Building2, title: "Architektur", value: "Neubau Mehrfamilienhaus" },
  { icon: KeyRound, title: "Einheiten", value: "5 Eigentumswohnungen" },
  { icon: Calendar, title: "Realisierung", value: "2025 / 2026" },
  { icon: MapPin, title: "Standort", value: "Am Sickingerhof 10\n76297 Stutensee · OT Spöck" },
  { icon: Ruler, title: "Wohnfläche", value: "465 m² Wohn- / 240 m² Nutzfläche" },
  { icon: Box, title: "Bruttorauminhalt", value: "2.829 m³" },
];

const ProjektDatenSection = () => {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [350, 0]);

  return (
    <motion.section ref={sectionRef} style={{ y }} className="py-[clamp(4rem,3rem+5vw,8rem)] -mt-[200px] bg-bg-alt">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
            Auf einen Blick
          </p>
          <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary">
            Projektdaten
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 }}
              className="bg-background p-8 rounded-lg border border-border-light hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-bg-alt rounded-md mb-4">
                <item.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-base font-medium text-primary leading-normal whitespace-pre-line">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjektDatenSection;
