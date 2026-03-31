'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const UnternehmenSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]" id="unternehmen">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
          <div>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
              Über uns
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6">
              GLP Designbau GmbH
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-base text-muted-foreground leading-[1.8] mb-6">
              Am 09. Januar 2025 wurde die glp designbau GmbH von den Geschäftsführern Dennis Geißler und Nicole LaCroix ins Leben gerufen. Das gemeinsame Unternehmen setzt neue Maßstäbe im Immobilien- und Bausektor, indem es innovative Ideen kreativ, zuverlässig und nachhaltig umsetzt.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="text-base text-muted-foreground leading-[1.8] mb-10">
              Als Projektentwickler bietet glp designbau umfassende Unterstützung in den Bereichen Projektmanagement, Architektur und Bauingenieurwesen.
            </motion.p>

            <div className="grid gap-6 mt-10">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="p-6 bg-bg-alt rounded-lg border-l-[3px] border-accent">
                <h4 className="text-base font-semibold text-primary mb-1">la croix [architekten]</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Visionäre Räume und Gebäude, die Ästhetik und Funktionalität vereinen. Innovative Lösungen für komplexe Bauprojekte.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="p-6 bg-bg-alt rounded-lg border-l-[3px] border-accent">
                <h4 className="text-base font-semibold text-primary mb-1">Geissler Projekt</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Fundiertes Fachwissen in Strukturanalyse, Materialien und Bauprozessen. Technische Lösungen, die innovative Ideen in die Praxis umsetzen.</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden min-h-[500px]"
          >
            <img
              src="/geisler-lacroix.png"
              alt="Dennis Geißler & Nicole LaCroix"
              className="w-full h-full object-cover min-h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnternehmenSection;
