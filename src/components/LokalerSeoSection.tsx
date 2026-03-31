'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LokalerSeoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]" id="standort-info">
      <div className="container max-w-[800px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-8 text-center">
            Eigentumswohnung kaufen im Raum Karlsruhe. Warum Stutensee-Spöck?
          </h2>
          <p className="text-base text-muted-foreground leading-[1.8] mb-6">
            Stutensee-Spöck zählt zu den beliebtesten Wohnlagen für Familien und Paare, die eine Eigentumswohnung im Raum Karlsruhe suchen. Der Ortsteil Spöck verbindet ländliche Ruhe mit urbaner Anbindung: Schulen, Kindergärten, Ärzte und Einkaufsmöglichkeiten sind fußläufig erreichbar, während die Straßenbahn eine direkte Verbindung in die Karlsruher Innenstadt bietet.
          </p>
          <p className="text-base text-muted-foreground leading-[1.8]">
            Das Neubaugebiet 24Morgenäcker liegt in einer der wachstumsstärksten Gemeinden im Landkreis Karlsruhe. Wer Immobilien in Stutensee kaufen möchte, profitiert hier von einer hervorragenden Infrastruktur und einem modernen Wohnumfeld. Die Nähe zu Bruchsal, Walldorf und Heidelberg macht den Standort auch für Berufspendler attraktiv.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LokalerSeoSection;
