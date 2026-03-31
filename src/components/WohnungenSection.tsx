'use client';

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Maximize2, Archive, DoorOpen, Car, Sun, MoveUp, ArrowRight } from "lucide-react";

interface GalleryImage {
  src: string | null;
  alt: string;
  className?: string;
}

interface ApartmentSpec {
  icon: React.ElementType;
  strong: string;
  span: string;
}

interface ApartmentData {
  badge: string;
  premium?: boolean;
  title: string;
  desc: string;
  specs: ApartmentSpec[];
  priceLabel: string;
  priceValue: string;
  tags: string[];
  premiumTag?: string;
  reverse?: boolean;
  images: GalleryImage[];
  sold?: boolean;
  hideGalleryThumbs?: boolean;
}

const apartments: ApartmentData[] = [
  {
    badge: "Erdgeschoss",
    title: "Wohneinheit 1 & 2",
    desc: "Die beiden Eigentumswohnungen im Erdgeschoss erstrecken sich über jeweils 85 m² Wohnfläche mit privater Terrasse und eigenem Gartenbereich. Die altersgerechten 3-Zimmer-Wohnungen in Stutensee werden über drei Seiten belichtet und verfügen über ein Hauptschlafzimmer sowie ein weiteres Zimmer, ideal als Kinder- oder Gästezimmer.",
    specs: [
      { icon: Maximize2, strong: "ca. 85 m²", span: "Wohnfläche mit Terrasse & Garten" },
      { icon: Archive, strong: "ca. 26 m²", span: "Privater Kellerraum" },
      { icon: DoorOpen, strong: "3 Zimmer", span: "Schlafzimmer, Kinder-/Gästezimmer, Wohnen/Essen" },
      { icon: Car, strong: "2 Stellplätze", span: "je 15.000 €" },
    ],
    priceLabel: "Kaufpreis je Wohneinheit",
    priceValue: "467.500 €",
    tags: ["Altersgerecht", "Tageslichtbad", "Privater Garten", "Terrasse", "Bodengleiche Dusche"],
    images: [
      { src: "/erdgeschoss.png", alt: "Visualisierung Erdgeschoss" },
      { src: "/eg-schlafzimmer.png", alt: "Schlafzimmer Erdgeschoss", className: "scale-x-[-1]" },
      { src: "/eg-grundriss-gesamt.png", alt: "Grundriss Erdgeschoss" },
    ],
  },
  {
    badge: "Obergeschoss",
    title: "Wohneinheit 3 & 4",
    desc: "Die Eigentumswohnungen 3 und 4 im Obergeschoss bieten jeweils 79 m² Wohnfläche mit Loggia als privater Außenbereich. Die 3-Zimmer-Wohnungen sind über das zentrale Treppenhaus mit Treppenanlage und Fahrstuhl bequem erreichbar.",
    specs: [
      { icon: Maximize2, strong: "ca. 79 m²", span: "Wohnfläche mit Loggia" },
      { icon: Archive, strong: "ca. 20 m²", span: "Privater Kellerraum" },
      { icon: DoorOpen, strong: "3 Zimmer", span: "Schlafzimmer, Kinder-/Gästezimmer, Wohnen/Essen" },
      { icon: Car, strong: "2 Stellplätze", span: "je 15.000 €" },
    ],
    priceLabel: "Kaufpreis je Wohneinheit",
    priceValue: "418.700 €",
    tags: ["Loggia", "Tageslichtbad", "Badewanne & Dusche", "Fahrstuhl", "3-seitig belichtet"],
    reverse: true,
    images: [
      { src: "/og-wohnen.png", alt: "Visualisierung Obergeschoss" },
      { src: "/og-schlafzimmer.png", alt: "Schlafzimmer Obergeschoss" },
      { src: "/og-grundriss-gesamt.png", alt: "Grundriss Obergeschoss" },
    ],
  },
  {
    badge: "Dachgeschoss · Penthouse",
    premium: true,
    title: "Wohneinheit 5",
    desc: "Das Dachgeschoss mit Pultdach bietet Raum für eine großzügige Penthouse-Wohnung mit hohen Wohnräumen und zwei Dachterrassen. Ein exklusives Wohnerlebnis auf der obersten Etage mit maximaler Privatsphäre und einzigartigem Raumgefühl.",
    specs: [
      { icon: Maximize2, strong: "ca. ––– m²", span: "Wohnfläche (auf Anfrage)" },
      { icon: Sun, strong: "2 Dachterrassen", span: "Großzügige Außenbereiche" },
      { icon: MoveUp, strong: "Pultdach", span: "Hohe Wohnräume mit besonderem Raumgefühl" },
      { icon: Car, strong: "Stellplätze", span: "Auf Anfrage" },
    ],
    priceLabel: "Kaufpreis",
    priceValue: "Auf Anfrage",
    tags: ["2 Dachterrassen", "Hohe Decken", "Pultdach", "Fahrstuhl"],
    premiumTag: "Penthouse",
    sold: true,
    hideGalleryThumbs: true,
    images: [
      { src: "/penthouse-wohnbereich.png", alt: "Penthouse Wohnbereich" },
    ],
  },
];

const ApartmentCard = ({ apt }: { apt: ApartmentData }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = apt.images[activeIndex];

  return (
    <div ref={ref} className="py-10 border-b border-border-light last:border-b-0">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch ${apt.reverse ? "lg:[direction:rtl]" : ""}`}>
        <div className={`flex flex-col gap-4 ${apt.reverse ? "[direction:ltr]" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: apt.reverse ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden flex-1 min-h-[280px] border border-border bg-bg-alt relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full absolute inset-0"
              >
                {activeImage.src ? (
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className={`w-full h-full object-cover ${activeImage.className || ""} ${apt.sold ? "blur-[6px] scale-105" : ""}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Sun size={32} className="mx-auto opacity-30 mb-3" />
                      <span className="text-xs opacity-50">{activeImage.alt}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            {apt.sold && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10">
                <span className="text-2xl font-heading font-semibold text-primary tracking-wide uppercase">Verkauft</span>
              </div>
            )}
          </motion.div>
          {!apt.hideGalleryThumbs && (
            <div className="grid grid-cols-3 gap-4">
              {apt.images.map((img, idx) => {
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                    className="bg-bg-alt rounded-lg aspect-[4/3] flex items-center justify-center border border-border text-muted-foreground overflow-hidden cursor-pointer hover:border-accent transition-colors"
                    onClick={() => setActiveIndex(idx)}
                  >
                    {img.src ? (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={`w-full h-full object-cover ${img.className || ""}`}
                      />
                    ) : (
                      <Sun size={18} className="opacity-20" />
                    )}
                  </motion.div>
                );
              }).filter(Boolean)}
            </div>
          )}
        </div>
        <div className={`flex flex-col ${apt.reverse ? "[direction:ltr]" : ""}`}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`inline-block self-start text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm mb-4 ${
              apt.premium ? "bg-primary text-accent-light" : "bg-accent/10 text-accent"
            }`}
          >
            {apt.badge}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-[clamp(1.5rem,1.2rem+1.5vw,2.2rem)] font-medium text-primary mb-6"
          >
            {apt.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base text-muted-foreground leading-[1.8] mb-8"
          >
            {apt.desc}
          </motion.p>

          <div className="flex flex-col gap-4 mb-8">
            {apt.specs.map((spec, i) => (
              <motion.div
                key={spec.strong}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-4"
              >
                <spec.icon size={18} className="text-accent mt-0.5 min-w-[18px]" />
                <div>
                  <strong className="block text-base font-semibold text-primary">{spec.strong}</strong>
                  <span className="text-sm text-muted-foreground">{spec.span}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-baseline gap-4 px-6 py-5 bg-bg-alt rounded-md"
            >
              <span className="text-sm text-muted-foreground">{apt.priceLabel}</span>
              <span className="font-heading text-[clamp(1.5rem,1.2rem+1.5vw,2.2rem)] font-semibold text-primary">
                {apt.priceValue}
              </span>
            </motion.div>
            {!apt.sold && (
              <div className="flex flex-wrap gap-3 mt-4">
                <motion.a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector("#kontakt");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 88;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-all"
                >
                  Jetzt vormerken lassen oder Beratungstermin vereinbaren
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </motion.a>
                <motion.a
                  href="/expose.pdf"
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary/5 transition-all"
                >
                  Exposé downloaden
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </motion.a>
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
        className={`flex flex-wrap gap-1.5 mt-6 ${apt.reverse ? "lg:justify-end" : ""}`}
      >
        {apt.premiumTag && (
          <span className="text-xs font-medium px-3 py-1 bg-primary text-accent-light rounded-full border border-primary">
            {apt.premiumTag}
          </span>
        )}
        {apt.tags.map((tag) => (
          <span key={tag} className="text-xs font-medium px-3 py-1 bg-bg-alt text-muted-foreground rounded-full border border-border-light">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const WohnungenSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-[clamp(4rem,3rem+5vw,8rem)]" id="wohnungen">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-4"
          >
            Wohnangebote
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary mb-6"
          >
            Ihre neue Eigentumswohnung in Stutensee-Spöck
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed"
          >
            Fünf exklusive Eigentumswohnungen zum Kauf. Von der altersgerechten 3-Zimmer-Wohnung
            im Erdgeschoss bis zum großzügigen Penthouse im Dachgeschoss.
          </motion.p>
        </div>

        {apartments.map((apt) => (
          <ApartmentCard key={apt.title} apt={apt} />
        ))}
      </div>
    </section>
  );
};

export default WohnungenSection;
