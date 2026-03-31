'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Was kosten die Eigentumswohnungen am Sickingerhof in Stutensee-Spöck?",
    a: "Die Kaufpreise der fünf Eigentumswohnungen im Neubaugebiet 24Morgenäcker beginnen bei 418.700 € für eine 3-Zimmer-Wohnung im Obergeschoss mit ca. 79 m² Wohnfläche. Die Erdgeschosswohnungen mit ca. 85 m² und privatem Gartenbereich sind ab 467.500 € erhältlich. Der Preis für die Penthouse-Wohnung im Dachgeschoss ist auf Anfrage verfügbar. Stellplätze kosten jeweils 15.000 € zusätzlich.",
  },
  {
    q: "Wann sind die Neubauwohnungen in Stutensee-Spöck bezugsfertig?",
    a: 'Die Realisierung des Neubauprojekts „Wohnen am Sickingerhof" ist für 2025/2026 geplant. Für den genauen Bezugstermin kontaktieren Sie bitte die glp designbau GmbH direkt über das Kontaktformular.',
  },
  {
    q: "Sind die Wohnungen am Sickingerhof altersgerecht?",
    a: "Ja. Insbesondere die beiden Erdgeschosswohnungen (Wohneinheit 1 und 2) sind altersgerecht konzipiert. Sie verfügen über bodengleiche Duschen, Tageslichtbäder und einen ebenerdigen Zugang zum privaten Gartenbereich. Alle Etagen des Gebäudes sind zudem über einen Aufzug erreichbar.",
  },
  {
    q: "Wie ist die Anbindung von Stutensee-Spöck an Karlsruhe und Bruchsal?",
    a: "Stutensee-Spöck bietet eine hervorragende Verkehrsanbindung. Eine Straßenbahnhaltestelle ist fußläufig erreichbar und verbindet den Ort direkt mit der Karlsruher Innenstadt. Die Autobahnauffahrt Bruchsal zur A5 liegt nur ca. 3 km entfernt. Karlsruhe ist etwa 15 km, Stuttgart ca. 80 km und Frankfurt am Main ca. 110 km entfernt.",
  },
  {
    q: "Welche Ausstattung haben die Neubauwohnungen?",
    a: "Alle fünf Eigentumswohnungen verfügen über Fußbodenheizung, Echtholzparkett, Tageslichtbäder und bodengleiche Duschen. Das Gebäude wird nachhaltig mit einer Wärmepumpe beheizt und besitzt eine eigene Photovoltaikanlage auf dem Dach. Jede Wohneinheit erhält bis zu zwei Stellplätze und einen privaten Kellerraum.",
  },
  {
    q: "Wie viele Zimmer haben die Wohnungen?",
    a: "Alle fünf Wohneinheiten sind als 3-Zimmer-Wohnungen konzipiert, mit Schlafzimmer, Kinder- bzw. Gästezimmer und offenem Wohn-/Essbereich. Die Wohnflächen reichen von ca. 79 m² im Obergeschoss bis zur großzügigen Penthouse-Wohnung im Dachgeschoss.",
  },
];

const FaqSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]" id="faq">
      <div className="container max-w-[800px]">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4">
            Häufig gestellte Fragen
          </p>
          <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6">
            Fragen & Antworten zum Neubauprojekt am Sickingerhof
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Accordion type="single" collapsible defaultValue="faq-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  <h3 className="text-base font-semibold text-primary pr-4">{faq.q}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-muted-foreground leading-[1.8]">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
