'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Thermometer, Trees, ShowerHead, Sun, Zap, Wind, ArrowUpDown, SquareParking } from "lucide-react";

const features = [
  { icon: Thermometer, title: "Fußbodenheizung", desc: "Angenehme Wärme und Wohlfühlklima in allen Räumen." },
  { icon: Trees, title: "Echtholzparkett", desc: "Warme, natürliche Atmosphäre im Wohnbereich und allen Zimmern." },
  { icon: ShowerHead, title: "Bodengleiche Dusche", desc: "Hochwertige Sanitärausstattung mit Glastrennwand und Handtuchheizkörper." },
  { icon: Sun, title: "Tageslichtbäder", desc: "Beleuchteter Spiegelschrank und natürliches Licht im Badezimmer." },
  { icon: Zap, title: "Photovoltaikanlage", desc: "Nachhaltige Energieversorgung durch eigene PV-Anlage auf dem Dach." },
  { icon: Wind, title: "Wärmepumpe", desc: "Effiziente und umweltfreundliche Heizung und Warmwasserbereitung." },
  { icon: ArrowUpDown, title: "Aufzug", desc: "Großzügiger Fahrstuhl für bequemen Zugang zu allen Etagen und dem Fahrradkeller." },
  { icon: SquareParking, title: "Stellplätze", desc: "Bis zu 2 Stellplätze pro Wohneinheit direkt vor dem Gebäude." },
];

const AusstattungSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [350, 0]);

  return (
    <motion.section ref={sectionRef} style={{ y }} className="py-[clamp(4rem,3rem+5vw,8rem)] bg-bg-alt" id="ausstattung">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
            Qualität im Detail
          </p>
          <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6">
            Hochwertige Ausstattung & moderner Komfort
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Moderner Komfort vereint mit stilvollem Design in jeder Eigentumswohnung, nachhaltig gebaut mit Wärmepumpe und Photovoltaikanlage.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background p-8 rounded-lg border border-border-light hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-bg-alt rounded-md mb-4">
                <f.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-primary mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AusstattungSection;
