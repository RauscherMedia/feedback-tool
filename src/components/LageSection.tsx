'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrainFront, Route, ShoppingCart, GraduationCap } from "lucide-react";

const locations = [
  { icon: TrainFront, title: "ÖPNV", desc: "Fußläufige Straßenbahnhaltestelle mit schneller Verbindung in die Karlsruher Innenstadt. Ideal für Pendler, die eine Eigentumswohnung im Raum Karlsruhe suchen." },
  { icon: Route, title: "Autobahn", desc: "Schnelle Erreichbarkeit der A5 über die Auffahrt Bruchsal, nur ca. 3 km entfernt. Hervorragende Anbindung an das regionale Radwegenetz." },
  { icon: ShoppingCart, title: "Nahversorgung", desc: "Apotheke, Arztpraxen, Einkaufsmöglichkeiten. Alles fußläufig erreichbar." },
  { icon: GraduationCap, title: "Bildung", desc: "Schulen und Kindergärten in direkter Umgebung und fußläufig erreichbar." },
];

const MapSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 100 1000 714" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="bgFade" cx="700" cy="457" r="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(var(--bg-dark))" stopOpacity="0"/>
        <stop offset="70%" stopColor="hsl(var(--bg-dark))" stopOpacity="0"/>
        <stop offset="100%" stopColor="hsl(var(--bg-dark))" stopOpacity="0.92"/>
      </radialGradient>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8B7355" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#8B7355" stopOpacity="0"/>
      </radialGradient>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect x="100" y="0" width="1400" height="1000" fill="hsl(var(--bg-dark))"/>

    {/* Rivers */}
    <path d="M 620,-20 C 625,40 630,100 635,160 C 640,210 643,250 648,300 C 652,340 656,370 660,400 C 664,430 668,460 670,490 C 672,520 672,550 670,580 C 668,610 664,640 658,680 C 652,720 644,770 636,830 C 630,880 625,930 620,1020"
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="18" strokeLinecap="round"/>
    <path d="M 620,-20 C 625,40 630,100 635,160 C 640,210 643,250 648,300 C 652,340 656,370 660,400 C 664,430 668,460 670,490 C 672,520 672,550 670,580 C 668,610 664,640 658,680 C 652,720 644,770 636,830 C 630,880 625,930 620,1020"
          fill="none" stroke="rgba(155,181,201,0.08)" strokeWidth="8" strokeLinecap="round"/>
    <text x="610" y="720" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic" fill="rgba(155,181,201,0.18)" letterSpacing="0.15em" transform="rotate(-8,610,720)">RHEIN</text>

    <path d="M 1100,260 C 1020,272 960,280 900,290 C 850,298 810,305 786,310 C 760,316 740,330 720,345 C 705,358 690,370 676,385"
          fill="none" stroke="rgba(155,181,201,0.07)" strokeWidth="5" strokeLinecap="round"/>
    <text x="920" y="268" fontFamily="Inter, sans-serif" fontSize="9" fontStyle="italic" fill="rgba(155,181,201,0.15)" letterSpacing="0.12em">NECKAR</text>

    {/* Highways */}
    <path d="M 740,-20 C 742,60 744,140 746,220 C 748,280 750,330 750,380 C 750,420 748,460 745,500 C 742,540 738,580 732,630 C 726,680 718,740 708,810 C 700,870 692,930 684,1020"
          fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="3.5" strokeDasharray="10,5"/>
    <rect x="740" y="168" width="26" height="15" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
    <text x="753" y="179" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)" textAnchor="middle">A5</text>

    <path d="M 280,380 C 360,390 440,400 520,412 C 580,420 630,426 680,432 C 730,438 780,443 840,448 C 900,453 980,458 1100,465"
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeDasharray="10,5"/>
    <rect x="470" y="400" width="26" height="15" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
    <text x="483" y="411" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)" textAnchor="middle">A6</text>

    <path d="M 760,510 C 800,540 850,570 900,595 C 950,620 1010,650 1080,685 C 1150,720 1230,755 1320,795"
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" strokeDasharray="10,5"/>
    <rect x="870" y="585" width="26" height="15" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
    <text x="883" y="596" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)" textAnchor="middle">A8</text>

    <path d="M 748,430 C 755,400 762,370 768,345 C 774,320 780,300 786,288"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="6,3"/>

    <path d="M 320,180 C 350,260 390,340 430,420 C 470,500 510,580 550,670 C 580,740 600,800 620,870"
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="6,3"/>

    <circle cx="700" cy="460" r="120" fill="url(#centerGlow)"/>

    {/* City dots */}
    <circle cx="644" cy="138" r="3.5" fill="#A8956F" opacity="0.35"/>
    <text x="618" y="135" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="end" opacity="0.4" letterSpacing="0.08em">WORMS</text>

    <circle cx="536" cy="416" r="3.5" fill="#A8956F" opacity="0.35"/>
    <text x="510" y="413" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="end" opacity="0.4" letterSpacing="0.08em">LANDAU</text>

    <circle cx="574" cy="634" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="548" y="631" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="end" opacity="0.4" letterSpacing="0.08em">RASTATT</text>

    <circle cx="797" cy="612" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="822" y="615" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" opacity="0.4" letterSpacing="0.08em">PFORZHEIM</text>

    <circle cx="666" cy="581" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="640" y="578" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="end" opacity="0.45" letterSpacing="0.08em">ETTLINGEN</text>

    <circle cx="801" cy="519" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="822" y="522" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" opacity="0.45" letterSpacing="0.08em">BRETTEN</text>

    <circle cx="716" cy="425" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="716" y="416" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="middle" opacity="0.45" letterSpacing="0.08em">WAGHÄUSEL</text>

    <circle cx="676" cy="333" r="3.5" fill="#A8956F" opacity="0.4"/>
    <text x="650" y="330" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="end" opacity="0.45" letterSpacing="0.08em">SPEYER</text>

    <circle cx="742" cy="297" r="3.5" fill="#A8956F" opacity="0.45"/>
    <text x="742" y="288" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="500" fill="#E8E4DE" textAnchor="middle" opacity="0.45" letterSpacing="0.08em">SCHWETZINGEN</text>

    <circle cx="772" cy="347" r="4" fill="#A8956F" opacity="0.45"/>
    <text x="796" y="344" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="500" fill="#E8E4DE" opacity="0.5" letterSpacing="0.08em">WALLDORF</text>

    <circle cx="678" cy="238" r="4.5" fill="#A8956F" opacity="0.5"/>
    <text x="648" y="235" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#E8E4DE" textAnchor="end" opacity="0.55" letterSpacing="0.08em">LUDWIGSHAFEN</text>

    <circle cx="752" cy="464" r="5" fill="#A8956F" opacity="0.5"/>
    <text x="775" y="458" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="600" fill="#E8E4DE" opacity="0.6" letterSpacing="0.08em">BRUCHSAL</text>
    <text x="775" y="470" fontFamily="Inter, sans-serif" fontSize="7" fill="#8B7355" opacity="0.7" letterSpacing="0.04em">Autobahnauffahrt ~3 km</text>

    <circle cx="692" cy="231" r="6" fill="#A8956F" opacity="0.55"/>
    <text x="692" y="217" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" fill="#E8E4DE" textAnchor="middle" opacity="0.65" letterSpacing="0.1em">MANNHEIM</text>

    <circle cx="786" cy="288" r="7" fill="#A8956F" opacity="0.6"/>
    <text x="815" y="284" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#E8E4DE" opacity="0.7" letterSpacing="0.1em">HEIDELBERG</text>

    <circle cx="664" cy="538" r="7" fill="#A8956F" opacity="0.6"/>
    <text x="620" y="548" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#E8E4DE" textAnchor="end" opacity="0.7" letterSpacing="0.1em">KARLSRUHE</text>

    {/* Directional arrows */}
    <line x1="1020" y1="670" x2="1120" y2="722" stroke="#A8956F" strokeWidth="0.9" opacity="0.4"/>
    <polygon points="1120,722 1110,717 1113,726" fill="#A8956F" opacity="0.4"/>
    <text x="1050" y="710" fontFamily="Inter, sans-serif" fontSize="8" fill="#A8956F" opacity="0.5" transform="rotate(25,1050,710)">80 km nach Stuttgart</text>

    <line x1="720" y1="140" x2="726" y2="108" stroke="#A8956F" strokeWidth="0.9" opacity="0.4"/>
    <polygon points="726,108 722,117 730,117" fill="#A8956F" opacity="0.4"/>
    <text x="742" y="118" fontFamily="Inter, sans-serif" fontSize="8" fill="#A8956F" opacity="0.5">110 km nach Frankfurt/Main</text>

    {/* Center point */}
    <ellipse cx="700" cy="480" rx="10" ry="3" fill="rgba(0,0,0,0.3)"/>
    <path d="M700,477 C700,477 718,456 718,445 C718,435 710,427 700,427 C690,427 682,435 682,445 C682,456 700,477 700,477 Z" fill="#A8956F" filter="url(#softGlow)"/>
    <circle cx="700" cy="445" r="5" fill="hsl(var(--bg-dark))"/>

    <text x="700" y="498" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" fontWeight="600" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.06em">STUTENSEE-SPÖCK</text>
    <text x="700" y="511" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="500" fill="#A8956F" textAnchor="middle" letterSpacing="0.08em">NEUBAUGEBIET 24MORGENÄCKER</text>

    <rect x="100" y="0" width="1400" height="1000" fill="url(#bgFade)"/>
  </svg>
);

const LageSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-bg-dark text-text-on-dark" id="lage">
      {/* Background map – right half, full section height */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute top-0 bottom-0 right-0 w-[55%]">
          <MapSvg />
        </div>
        {/* Gradient fade from left content area into the map */}
        <div className="absolute top-0 bottom-0 right-0 w-[55%] bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent pointer-events-none" style={{ width: '20%', left: '40%' }} />
      </div>

      <div className="relative z-10 container py-[clamp(4rem,3rem+5vw,8rem)]">
        <div className="text-center lg:text-left lg:max-w-[50%] mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-light mb-4">
            Standort
          </p>
          <h2 className="font-heading text-[clamp(2rem,1.5rem+2.5vw,3.2rem)] font-medium leading-[1.2] text-primary-foreground mb-6">
            Standort Stutensee-Spöck – Wohnen zwischen Karlsruhe und Bruchsal
          </h2>
          <p className="text-lg text-primary-foreground/60 max-w-[600px] lg:mx-0 mx-auto leading-relaxed">
            Hervorragende Anbindung an Karlsruhe und Bruchsal – ruhige Lage im Grünen
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:max-w-[50%] gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 rounded-lg hover:bg-primary-foreground/10 hover:-translate-y-0.5 transition-all backdrop-blur-sm"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-primary-foreground/10 rounded-md mb-4">
                <loc.icon size={20} className="text-accent-light" />
              </div>
              <h3 className="text-base font-semibold text-primary-foreground mb-2">{loc.title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{loc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: show map below cards */}
        <div className="mt-10 lg:hidden rounded-xl overflow-hidden">
          <MapSvg />
        </div>
      </div>
    </section>
  );
};

export default LageSection;
