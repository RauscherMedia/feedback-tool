'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Home, Layers, Sun } from "lucide-react";

const floors = [
  { icon: ArrowDown, title: "Kellergeschoss", desc: "Private Kellerräume, gemeinschaftlicher Fahrradraum und zentraler Technikraum." },
  { icon: Home, title: "Erdgeschoss", desc: "Zwei altersgerechte 3-Zimmer-Wohnungen mit Tageslichtbad und privatem Gartenbereich." },
  { icon: Layers, title: "Obergeschoss", desc: "Zwei weitere 3-Zimmer-Wohnungen, erreichbar über Aufzug und zentrales Treppenhaus." },
  { icon: Sun, title: "Dachgeschoss", desc: "Großzügige Penthouse-Wohnung mit Pultdach, hohen Wohnräumen und zwei Dachterrassen." },
];

const GebaeudeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-lg overflow-hidden lg:order-first order-last"
          >
            <img
              src="/sickingerhof-sued.png"
              alt="Gebäudeansicht Süd - Visualisierung"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4"
            >
              Gebäudestruktur
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-10"
            >
              Vier Geschosse,
              <br />
              fünf Wohnwelten
            </motion.h2>

            <div className="flex flex-col gap-6">
              {floors.map((floor, i) => (
                <motion.div
                  key={floor.title}
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-10 h-10 min-w-[40px] flex items-center justify-center bg-bg-alt rounded-md">
                    <floor.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-primary mb-0.5">{floor.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{floor.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GebaeudeSection;
