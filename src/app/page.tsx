'use client';

import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import ProjektSection from '@/components/ProjektSection';
import ProjektDatenSection from '@/components/ProjektDatenSection';
import GebaeudeSection from '@/components/GebaeudeSection';
import ImageSliderSection from '@/components/ImageSliderSection';
import LageSection from '@/components/LageSection';
import LokalerSeoSection from '@/components/LokalerSeoSection';
import WohnungenSection from '@/components/WohnungenSection';
import AusstattungSection from '@/components/AusstattungSection';
import FaqSection from '@/components/FaqSection';
import CtaBanner from '@/components/CtaBanner';
import UnternehmenSection from '@/components/UnternehmenSection';
import KontaktSection from '@/components/KontaktSection';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <main>
        <ProjektSection />
        <ProjektDatenSection />
        <GebaeudeSection />
        <ImageSliderSection />
        <LageSection />
        <LokalerSeoSection />
        <WohnungenSection />
        <AusstattungSection />
        <FaqSection />
        <CtaBanner />
        <UnternehmenSection />
        <KontaktSection />
      </main>
      <SiteFooter />
    </>
  );
}
